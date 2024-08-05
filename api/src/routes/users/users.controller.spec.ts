import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../database/entities/user.entity';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UsersController', () => {
  let app: INestApplication;
  let service: UsersService;
  let consoleErrorSpy: jest.SpyInstance;

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

    // Mock console.error to suppress error logging during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return 200 if the user already exists', async () => {
    const existingUser: User = { id: 1, username: 'testuser', pictures: [], favorites: [] };
    jest.spyOn(service, 'findUser').mockResolvedValueOnce(existingUser);

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: 'testuser' })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual(existingUser);
  });

  it('should return 201 if the user is newly created', async () => {
    const newUser: User = { id: 2, username: 'newuser', pictures: [], favorites: [] };
    jest.spyOn(service, 'findUser').mockResolvedValueOnce(undefined);
    jest.spyOn(service, 'createUser').mockResolvedValueOnce(newUser);

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: 'newuser' })
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(newUser);
  });

  it('should return 400 if the username is missing', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message.toString()).toContain("Username should not be empty,Username must be a string");
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
