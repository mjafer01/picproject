import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { PicturesModule } from './pictures.module';
import { UsersModule } from '../users/users.module';
import { User } from '../../database/entities/user.entity';
import { Picture } from '../../database/entities/picture.entity';
import { Favorite } from '../../database/entities/favorite.entity';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PicturesModule', () => {
  let picturesService: PicturesService;
  let picturesController: PicturesController;
  let picturesRepository: Repository<Picture>;
  let favoriteRepository: Repository<Favorite>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PicturesModule,
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Picture, Favorite],
          synchronize: true,
        }),
      ],
    }).compile();

    picturesService = module.get<PicturesService>(PicturesService);
    picturesController = module.get<PicturesController>(PicturesController);
    picturesRepository = module.get<Repository<Picture>>(getRepositoryToken(Picture));
    favoriteRepository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(picturesService).toBeDefined();
    expect(picturesController).toBeDefined();
    expect(picturesRepository).toBeDefined();
    expect(favoriteRepository).toBeDefined();
    expect(usersService).toBeDefined();
  });

});
