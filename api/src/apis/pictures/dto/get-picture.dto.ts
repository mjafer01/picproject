import { ApiProperty } from '@nestjs/swagger';

export class GetPictureDto {
  @ApiProperty({ example: '1', description: 'ID of the picture' })
  id: number;

  @ApiProperty({ example: 'http://example.com/picture.jpg', description: 'URL of the picture' })
  url: string;

  @ApiProperty({ example: 'A beautiful sunset', description: 'Title of the picture' })
  title: string;

  @ApiProperty({ example: '2024-08-03T04:14:08.636Z', description: 'Creation date of the picture' })
  createdAt: Date;
}
