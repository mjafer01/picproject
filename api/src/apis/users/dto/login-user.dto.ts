import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The username of the user',
   // minLength: 3,
   // maxLength: 20,
    example: 'john_doe',
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  //@MinLength(3, { message: 'Username must be at least 3 characters long' })
  //@MaxLength(20, { message: 'Username must not be longer than 20 characters' })
  username: string;
}
