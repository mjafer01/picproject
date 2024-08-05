import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  HttpStatus,
  ValidationPipe,
  NotFoundException,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import * as request from 'supertest';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { UsersService } from '../users/users.service';
import { PicturesService } from '../pictures/pictures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../database/entities/favorite.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { Picture } from '../../database/entities/picture.entity';

describe('FavoritesController (e2e)', () => {
  let app: INestApplication;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                return { id, username: 'testuser', pictures: [], favorites: [] };
              }
              return null;
            }),
          },
        },
        {
          provide: PicturesService,
          useValue: {
            findById: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                let pictures: Picture[] = []
                let favorites: Favorite[] = []
                const user = { id: 1, username: 'testuser', pictures, favorites };
                return { id, url: 'http://example.com/picture.jpg', title: 'A beautiful sunset', createdAt: new Date(), user };
              }
              return null;
            }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          const authorizationHeader = request.headers['authorization'];

          if (!authorizationHeader || isNaN(parseInt(authorizationHeader, 10))) {
            throw new UnauthorizedException('Invalid User');
          }

          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    favoritesService = moduleFixture.get<FavoritesService>(FavoritesService);
  });

  describe('/favorites/:pictureId (POST)', () => {
    it('should return 200 when favorite is toggled successfully', async () => {
      jest.spyOn(favoritesService, 'toggleFavorite').mockResolvedValueOnce(undefined);

      return request(app.getHttpServer())
        .post('/favorites/1')
        .set('Authorization', '1')
        .expect(HttpStatus.OK);
    });

    it('should return 404 when user or picture is not found', async () => {
      jest.spyOn(favoritesService, 'toggleFavorite').mockRejectedValueOnce(new NotFoundException('User or Picture not found'));

      return request(app.getHttpServer())
        .post('/favorites/1')
        .set('Authorization', '1')
        .expect(HttpStatus.NOT_FOUND)
        .expect({ message: 'User or Picture not found' });
    });

    it('should return 500 for other errors', async () => {
      jest.spyOn(favoritesService, 'toggleFavorite').mockRejectedValueOnce(new Error('Some internal error'));

      return request(app.getHttpServer())
        .post('/favorites/1')
        .set('Authorization', '1')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect({ message: 'Internal Server Error' });
    });

    it('should return 401 when the authorization token is invalid', async () => {
      return request(app.getHttpServer())
        .post('/favorites/1')
        .set('Authorization', 'invalid-token')
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({ statusCode: 401, message: 'Invalid User', error: 'Unauthorized' });
    });

    it('should return 401 when the authorization header is missing', async () => {
      return request(app.getHttpServer())
        .post('/favorites/1')
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({ statusCode: 401, message: 'Invalid User', error: 'Unauthorized' });
    });
  });

  describe('/favorites (GET)', () => {
    it('should return 200 and the favorite pictures', async () => {
      const favoritePicturesResponse ={
        pictures: [
          {
            id: 1,
            url: 'http://example.com/picture.jpg',
            title: 'A beautiful sunset',
            createdAt: new Date().toString(),
            user: {
              id: 1,
              username: 'testuser',
            },
            isFavorite: true,
          },
        ],
        totalItems:1
      };

      jest.spyOn(favoritesService, 'getFavoritePictures').mockResolvedValueOnce(favoritePicturesResponse as any);

      return request(app.getHttpServer())
        .get('/favorites')
        .set('Authorization', '1')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual({pictures:favoritePicturesResponse.pictures,currentPage: 1,
            totalPages:1,
            hasNextPage:false
        })});
    });

    it('should return 404 when user is not found', async () => {
      jest.spyOn(favoritesService, 'getFavoritePictures').mockRejectedValueOnce(new NotFoundException('User not found'));

      return request(app.getHttpServer())
        .get('/favorites')
        .set('Authorization', '1')
        .expect(HttpStatus.NOT_FOUND)
        .expect({ message: 'User not found' });
    });

    it('should return 500 for other errors', async () => {
      jest.spyOn(favoritesService, 'getFavoritePictures').mockRejectedValueOnce(new Error('Error fetching favorite pictures'));

      return request(app.getHttpServer())
        .get('/favorites')
        .set('Authorization', '1')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect({ message: 'Error fetching favorite pictures' });
    });

    it('should return 401 when the authorization token is invalid', async () => {
      return request(app.getHttpServer())
        .get('/favorites')
        .set('Authorization', 'invalid-token')
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({ statusCode: 401, message: 'Invalid User', error: 'Unauthorized' });
    });

    it('should return 401 when the authorization header is missing', async () => {
      return request(app.getHttpServer())
        .get('/favorites')
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({ statusCode: 401, message: 'Invalid User', error: 'Unauthorized' });
    });
  });
});
