
import { ApiProperty } from '@nestjs/swagger';
export class ResponseLoginUserDto {
  @ApiProperty()
  id:number;
  @ApiProperty()
  username: string;
}
