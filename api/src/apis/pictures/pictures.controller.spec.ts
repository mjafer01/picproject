import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../../auth/auth.guard';
import { CreatePictureDto } from './dto/create-picture.dto';
import { User } from '../../database/entities/user.entity';
import { Picture } from '../../database/entities/picture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PicturesController (e2e)', () => {
  let app: INestApplication;
  let picturesService: PicturesService;
  let usersService: UsersService;
  let picturesRepository: Repository<Picture>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PicturesController],
      providers: [
        PicturesService,
        AuthGuard,
        {
          provide: getRepositoryToken(Picture),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                return {
                  id,
                  username: 'testuser',
                  pictures: [],
                  favorites: [],
                };
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    picturesService = moduleFixture.get<PicturesService>(PicturesService);
    usersService = moduleFixture.get<UsersService>(UsersService);
    picturesRepository = moduleFixture.get<Repository<Picture>>(getRepositoryToken(Picture));
  });

  describe('/pictures (POST)', () => {
    it('should return 201 when picture is shared successfully', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };

      jest.spyOn(picturesService, 'createPicture').mockResolvedValueOnce(undefined);

      return request(app.getHttpServer())
        .post('/pictures')
        .set('Authorization', '1')
        .send(createPictureDto)
        .expect(HttpStatus.CREATED);
    });

    it('should return 400 when there is an error sharing picture', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };

      jest.spyOn(picturesService, 'createPicture').mockRejectedValueOnce(new Error('Error sharing picture'));

      return request(app.getHttpServer())
        .post('/pictures')
        .set('Authorization', '1')
        .send(createPictureDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({ message: 'Error sharing picture' });
    });

    it('should return 401 when the authorization token is invalid', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };

      return request(app.getHttpServer())
        .post('/pictures')
        .set('Authorization', 'invalid-token')
        .send(createPictureDto)
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({ message: 'Invalid token', error: 'Unauthorized', statusCode: 401 });
    });

    it('should return 401 when the authorization header is missing', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };

      return request(app.getHttpServer())
        .post('/pictures')
        .send(createPictureDto)
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({ message: 'Invalid token', error: 'Unauthorized', statusCode: 401 });
    });

    it('should return 400 when URL is missing', async () => {
      const createPictureDto: CreatePictureDto = {
        url: '',
        title: 'A beautiful sunset',
      };

      return request(app.getHttpServer())
        .post('/pictures')
        .set('Authorization', '1')
        .send(createPictureDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when title is missing', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: '',
      };

      return request(app.getHttpServer())
        .post('/pictures')
        .set('Authorization', '1')
        .send(createPictureDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when both URL and title are missing', async () => {
      const createPictureDto: CreatePictureDto = {
        url: '',
        title: '',
      };

      return request(app.getHttpServer())
        .post('/pictures')
        .set('Authorization', '1')
        .send(createPictureDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/pictures (GET)', () => {
    it('should return 200 and pictures when pictures are fetched successfully', async () => {
      const user: User = { id: 1, username: 'testuser', pictures: [], favorites: [] } as User;
      const pictures: Picture[] = [
        { id: 1, url: 'http://example.com/picture1.jpg', title: 'Picture 1', createdAt: new Date(), user },
        { id: 2, url: 'http://example.com/picture2.jpg', title: 'Picture 2', createdAt: new Date(), user },
      ];

      jest.spyOn(picturesService, 'getPictures').mockResolvedValueOnce({ pictures, totalItems: 2 });

      return request(app.getHttpServer())
        .get('/pictures')
        .query({ page: 1, limit: 10 })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual({
            pictures: pictures.map(({ id, url, title, createdAt }) => ({
              id,
              url,
              title,
              createdAt: createdAt.toISOString(), // Convert createdAt to string
            })),
            currentPage: 1,
            totalPages: 1,
            hasNextPage: false,
          });
        });
    });

    it('should return 400 when there is an error fetching pictures', async () => {
      jest.spyOn(picturesService, 'getPictures').mockRejectedValueOnce(new Error('Error fetching pictures'));

      return request(app.getHttpServer())
        .get('/pictures')
        .query({ page: 1, limit: 10 })
        .expect(HttpStatus.BAD_REQUEST)
        .expect({ message: 'Error fetching pictures' });
    });

    it('should return 200 and pictures when page is missing', async () => {
      const user: User = { id: 1, username: 'testuser', pictures: [], favorites: [] } as User;
      const pictures: Picture[] = [
        { id: 1, url: 'http://example.com/picture1.jpg', title: 'Picture 1', createdAt: new Date(), user },
        { id: 2, url: 'http://example.com/picture2.jpg', title: 'Picture 2', createdAt: new Date(), user },
      ];

      jest.spyOn(picturesService, 'getPictures').mockResolvedValueOnce({ pictures, totalItems: 2 });

      return request(app.getHttpServer())
        .get('/pictures')
        .query({ limit: 10 })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual({
            pictures: pictures.map(({ id, url, title, createdAt }) => ({
              id,
              url,
              title,
              createdAt: createdAt.toISOString(), // Convert createdAt to string
            })),
            currentPage: 1,
            totalPages: 1,
            hasNextPage: false,
          });
        });
    });

    it('should return 200 and pictures when limit is missing', async () => {
      const user: User = { id: 1, username: 'testuser', pictures: [], favorites: [] } as User;
      const pictures: Picture[] = [
        { id: 1, url: 'http://example.com/picture1.jpg', title: 'Picture 1', createdAt: new Date(), user },
        { id: 2, url: 'http://example.com/picture2.jpg', title: 'Picture 2', createdAt: new Date(), user },
      ];

      jest.spyOn(picturesService, 'getPictures').mockResolvedValueOnce({ pictures, totalItems: 2 });

      return request(app.getHttpServer())
        .get('/pictures')
        .query({ page: 1 })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual({
            pictures: pictures.map(({ id, url, title, createdAt }) => ({
              id,
              url,
              title,
              createdAt: createdAt.toISOString(), // Convert createdAt to string
            })),
            currentPage: 1,
            totalPages: 1,
            hasNextPage: false,
          });
        });
    });

    it('should return 200 and pictures when both page and limit are missing', async () => {
      const user: User = { id: 1, username: 'testuser', pictures: [], favorites: [] } as User;
      const pictures: Picture[] = [
        { id: 1, url: 'http://example.com/picture1.jpg', title: 'Picture 1', createdAt: new Date(), user },
        { id: 2, url: 'http://example.com/picture2.jpg', title: 'Picture 2', createdAt: new Date(), user },
      ];

      jest.spyOn(picturesService, 'getPictures').mockResolvedValueOnce({ pictures, totalItems: 2 });

      return request(app.getHttpServer())
        .get('/pictures')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual({
            pictures: pictures.map(({ id, url, title, createdAt }) => ({
              id,
              url,
              title,
              createdAt: createdAt.toISOString(), // Convert createdAt to string
            })),
            currentPage: 1,
            totalPages: 1,
            hasNextPage: false,
          });
        });
    });

    it('should return 400 and indicate no more pages when pageNumber outof bound', async () => {
      const user: User = { id: 1, username: 'testuser', pictures: [], favorites: [] } as User;
      const pictures: Picture[] = [
        { id: 1, url: 'http://example.com/picture1.jpg', title: 'Picture 1', createdAt: new Date(), user },
        { id: 2, url: 'http://example.com/picture2.jpg', title: 'Picture 2', createdAt: new Date(), user },
      ];

      jest.spyOn(picturesService, 'getPictures').mockResolvedValueOnce({ pictures: [], totalItems: 2 });

      return request(app.getHttpServer())
        .get('/pictures')
        .query({ page: 3, limit: 10 }) // Assuming totalPages would be 1 for 2 items
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body).toEqual({
            "currentPage": "3",
            "message": "Page number out of range",
            "totalPages": 1,
        });
        });
    });
  });
});
