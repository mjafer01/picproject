import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePictureDto {
  @ApiProperty({ example: 'http://example.com/picture.jpg', description: 'URL of the picture' })
  @IsString({ message: 'The URL must be a string' })
  @IsNotEmpty({ message: 'The URL should not be empty' })
  url: string;

  @ApiProperty({ example: 'A beautiful sunset', description: 'Title of the picture' })
  @IsString({ message: 'The title must be a string' })
  @IsNotEmpty({ message: 'The title should not be empty' })
  title: string;
}
