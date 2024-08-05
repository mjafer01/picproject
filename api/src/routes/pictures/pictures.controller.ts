import { Controller, Post, Body, Res, UseGuards, HttpStatus, Headers, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { Response } from 'express';
import { AuthGuard } from '../../auth/auth.guard';
import { GetResponsePictureDto } from './dto/get-response-picture.dto';

@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(
    private readonly picturesService: PicturesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get Pictures',
    description: 'Fetches pictures uploaded by all users, ordered by upload date in descending order. Supports pagination for lazy loading.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched pictures.',
    type: [GetResponsePictureDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
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
    required: false,
  })
  async getPictures(
    @Res() res: Response,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Headers('Authorization') userId?: number,
  ): Promise<Response> {
    const pageNumber = page || 1;
    const limitNumber = limit || 10;

    try {
      const { pictures, totalItems } = await this.picturesService.getPictures(pageNumber, limitNumber,userId);
      const totalPages = Math.ceil(totalItems / limitNumber);

      if (pageNumber > totalPages && totalPages > 0) {
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
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error fetching pictures' });
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Share a Picture',
    description: 'Allows a user to share a picture by providing a URL and a title.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User ID token',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Picture shared successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async sharePicture(
    @Body() createPictureDto: CreatePictureDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ): Promise<Response> {
    try {
      const userId = parseInt(authorization, 10);
      await this.picturesService.createPicture(createPictureDto, userId);
      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error sharing picture' });
    }
  }
}
