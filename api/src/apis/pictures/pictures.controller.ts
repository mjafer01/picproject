import { Controller, Post, Body, Res, UseGuards, HttpStatus, Headers } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { Response } from 'express';
import { AuthGuard } from '../../auth/auth.guard';


@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

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
    @Headers('Authorization') authorization: string
  ): Promise<Response> {
    try {
      await this.picturesService.createPicture(createPictureDto, parseInt(authorization));
      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error sharing picture' });
    }
  }
}
