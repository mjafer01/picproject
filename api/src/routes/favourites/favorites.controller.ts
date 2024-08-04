import { Controller, Post, Param, Headers, Res, UseGuards, HttpStatus, NotFoundException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Response } from 'express';
import { ApiTags, ApiHeader, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

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
    description: 'Favorite status toggled successfully.',
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
}
