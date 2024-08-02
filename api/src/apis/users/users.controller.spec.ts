import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../database/entities/user.entity';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('UsersController', () => {
  let app: any;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findUser: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    service = module.get<UsersService>(UsersService);
  });

  it('should return 200 if the user already exists', async () => {
    const existingUser: User = { id: 1, username: 'testuser', pictures: [], favorites: [] };
    jest.spyOn(service, 'findUser').mockResolvedValueOnce(existingUser);

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: 'testuser' })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      id: existingUser.id,
      username: existingUser.username,
      pictures: existingUser.pictures,
      favorites: existingUser.favorites,
    });
  });

  it('should return 201 if the user is newly created', async () => {
    const newUser: User = { id: 1, username: 'newuser', pictures: [], favorites: [] };
    jest.spyOn(service, 'findUser').mockResolvedValueOnce(undefined);
    jest.spyOn(service, 'createUser').mockResolvedValueOnce(newUser);

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: 'newuser' })
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({
      id: newUser.id,
      username: newUser.username,
      pictures: newUser.pictures,
      favorites: newUser.favorites,
    });
  });

  it('should return 400 if the username is missing', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toContain('Username should not be empty');
  });

  it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(service, 'findUser').mockImplementationOnce(() => {
      throw new Error('Internal Server Error');
    });

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: 'testuser' })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.message).toBe('Internal Server Error');
  });

  afterAll(async () => {
    await app.close();
  });
});
