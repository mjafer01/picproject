import { ApiProperty } from '@nestjs/swagger';
import { Picture } from '../../../database/entities/picture.entity';

export class GetResponsePictureDto {
  pictures?: Picture[];
  currentPage: number;
  totalPages: number;
  hasNextPage?: boolean;
  message?:string
}
