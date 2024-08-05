import { Controller, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../../database/entities/user.entity';
import { ResponseLoginUserDto } from './dto/response-login-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'This endpoint allows users to log in by providing a username. If the username exists, it returns a token for the user. If the username does not exist, it creates a new user and returns a token for the new user.',

  })
  @ApiResponse({
    status: 200,
    description: 'Existing user logged in successfully.',
    type: ResponseLoginUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'New user created and logged in successfully.',
    type: ResponseLoginUserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    schema: {
      example: {
        message: 'Internal Server Error',
      },
    },
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Response> {
    try {
      const { username } = loginUserDto;
      let user = await this.usersService.findUser(username);

      if (!user) {
        user = await this.usersService.createUser(username);
        return res.status(HttpStatus.CREATED).json(user);
      }

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
}
