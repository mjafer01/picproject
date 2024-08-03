import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Picture } from '../../database/entities/picture.entity';
import { Favorite } from '../../database/entities/favorite.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findUser', () => {
    it('should return a user if the username exists', async () => {
      let pictures:Picture[] =[]
      let favorites:Favorite[] =[]
      const existingUser = { id: 1, username: 'existinguser', pictures, favorites};
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(existingUser);

      const user = await service.findUser('existinguser');

      expect(user).toEqual(existingUser);
    });

    it('should return undefined if the username does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      const user = await service.findUser('nonexistentuser');

      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      let pictures:Picture[] =[]
      let favorites:Favorite[] =[]
      const newUser = { id: 1, username: 'newuser', pictures, favorites };
      jest.spyOn(repository, 'create').mockImplementationOnce((user: User) => user);
      jest.spyOn(repository, 'save').mockImplementationOnce(async (user: User) => {
        user.id = 1;
        return user;
      });

      const user = await service.createUser('newuser');

      expect(user).toEqual(newUser);
    });
  });
});
