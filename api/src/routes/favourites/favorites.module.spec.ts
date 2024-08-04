import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesModule } from './favorites.module';
import { UsersModule } from '../users/users.module';
import { PicturesModule } from '../pictures/pictures.module';
import { Favorite } from '../../database/entities/favorite.entity';
import { User } from '../../database/entities/user.entity';
import { Picture } from '../../database/entities/picture.entity';
import { UsersService } from '../users/users.service';
import { PicturesService } from '../pictures/pictures.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FavoritesModule', () => {
  let favoritesService: FavoritesService;
  let favoritesController: FavoritesController;
  let favoriteRepository: Repository<Favorite>;
  let usersService: UsersService;
  let picturesService: PicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FavoritesModule,
        UsersModule,
        PicturesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Picture, Favorite],
          synchronize: true,
        }),
      ],
    }).compile();

    favoritesService = module.get<FavoritesService>(FavoritesService);
    favoritesController = module.get<FavoritesController>(FavoritesController);
    favoriteRepository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
    usersService = module.get<UsersService>(UsersService);
    picturesService = module.get<PicturesService>(PicturesService);
  });

  it('should be defined', () => {
    expect(favoritesService).toBeDefined();
    expect(favoritesController).toBeDefined();
    expect(favoriteRepository).toBeDefined();
    expect(usersService).toBeDefined();
    expect(picturesService).toBeDefined();
  });
});
