import { Controller, Post, Param, Headers, Res, UseGuards, HttpStatus, NotFoundException, Get, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Response } from 'express';
import { ApiTags, ApiHeader, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetResponsePictureDto } from '../pictures/dto/get-response-picture.dto';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':pictureId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Toggle Favorite',
    description: 'Toggles the favorite status of a picture for the current user.',
  })
  @ApiParam({
    name: 'pictureId',
    description: 'ID of the picture to be toggled as favorite',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User ID token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Favorite status toggled successfully.'
  })
  @ApiResponse({
    status: 404,
    description: 'User or Picture not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async toggleFavorite(
    @Param('pictureId') pictureId: number,
    @Headers('Authorization') authorization: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = parseInt(authorization);
      await this.favoritesService.toggleFavorite(userId, pictureId);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User or Picture not found' });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get Favorite Pictures',
    description: 'Fetches all favorite pictures of the current user with pagination support.',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page to be displayed',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit of the fetch items',
    required: false,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User ID token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched favorite pictures.',
    type: GetResponsePictureDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async getFavoritePictures(
    @Res() res: Response,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Headers('Authorization') authorization?: string,
  ): Promise<Response> {
    const pageNumber = page || 1;
    const limitNumber = limit || 10;

    try {
      const userId = parseInt(authorization);
      const { pictures, totalItems } = await this.favoritesService.getFavoritePictures(userId, pageNumber, limitNumber);
      const totalPages = Math.ceil(totalItems / limitNumber) ?? 1;

      if (pageNumber > totalPages ) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Page number out of range',
          currentPage: parseInt(String(pageNumber)),
          totalPages,
        });
      }

      const hasNextPage = pageNumber < totalPages;

      const response = {
        pictures,
        currentPage: parseInt(String(pageNumber)),
        totalPages,
        hasNextPage,
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching favorite pictures' });
    }
  }
}
