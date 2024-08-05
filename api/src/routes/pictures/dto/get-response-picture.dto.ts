import { ApiProperty } from '@nestjs/swagger';
import { Picture } from '../../../database/entities/picture.entity';

export class GetResponsePictureDto {
  @ApiProperty()
  pictures?: Picture[];
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  hasNextPage?: boolean;
  @ApiProperty()
  message?:string
}
