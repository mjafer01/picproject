import { Controller, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Existing user logged in successfully.', type: UserDto })
  @ApiResponse({ status: 201, description: 'New user created and logged in successfully.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Response> {
    try {
      const { username } = loginUserDto;
      let user = await this.usersService.findUser(username);

      if (!user) {
        user = await this.usersService.createUser(username);
        return res.status(HttpStatus.CREATED).json({ id: user.id, username: user.username, pictures: [], favorites: [] });
      }

      return res.status(HttpStatus.OK).json({ id: user.id, username: user.username, pictures: user.pictures, favorites: user.favorites });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
}
