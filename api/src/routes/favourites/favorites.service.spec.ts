import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from './favorites.service';
import { UsersService } from '../users/users.service';
import { PicturesService } from '../pictures/pictures.service';
import { Favorite } from '../../database/entities/favorite.entity';
import { User } from '../../database/entities/user.entity';
import { Picture } from '../../database/entities/picture.entity';
import { NotFoundException } from '@nestjs/common';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let favoriteRepository: Repository<Favorite>;
  let usersService: UsersService;
  let picturesService: PicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
        {
          provide: PicturesService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    favoriteRepository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
    usersService = module.get<UsersService>(UsersService);
    picturesService = module.get<PicturesService>(PicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('toggleFavorite', () => {
    it('should add a favorite if it does not exist', async () => {
      const userId = 1;
      const pictureId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [],
        favorites: [],
      } as User;
      const picture: Picture = {
        id: pictureId,
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
        createdAt: new Date(),
        user,
      } as Picture;
      const favorite: Favorite = { id: 1, user, picture } as Favorite;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(picturesService, 'findById').mockResolvedValue(picture);
      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(favoriteRepository, 'create').mockReturnValue(favorite);
      jest.spyOn(favoriteRepository, 'save').mockResolvedValue(favorite);
      jest.spyOn(favoriteRepository, 'delete').mockResolvedValue(undefined);

      await service.toggleFavorite(userId, pictureId);

      expect(usersService.findUserById).toHaveBeenCalledWith(userId);
      expect(picturesService.findById).toHaveBeenCalledWith(pictureId);
      expect(favoriteRepository.findOne).toHaveBeenCalledWith({ where: { user, picture } });
      expect(favoriteRepository.create).toHaveBeenCalledWith({ user, picture });
      expect(favoriteRepository.save).toHaveBeenCalledWith(favorite);
      expect(favoriteRepository.delete).not.toHaveBeenCalledWith(favorite.id);
    });

    it('should remove a favorite if it exists', async () => {
      const userId = 1;
      const pictureId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [],
        favorites: [],
      } as User;
      const picture: Picture = {
        id: pictureId,
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
        createdAt: new Date(),
        user,
      } as Picture;
      const favorite: Favorite = { id: 1, user, picture } as Favorite;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(picturesService, 'findById').mockResolvedValue(picture);
      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(favorite);
      jest.spyOn(favoriteRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(favoriteRepository, 'create').mockReturnValue(favorite);
      jest.spyOn(favoriteRepository, 'save').mockResolvedValue(favorite);

      await service.toggleFavorite(userId, pictureId);

      expect(usersService.findUserById).toHaveBeenCalledWith(userId);
      expect(picturesService.findById).toHaveBeenCalledWith(pictureId);
      expect(favoriteRepository.findOne).toHaveBeenCalledWith({ where: { user, picture } });
      expect(favoriteRepository.delete).toHaveBeenCalledWith(favorite.id);
      expect(favoriteRepository.create).not.toHaveBeenCalled();
      expect(favoriteRepository.save).not.toHaveBeenCalled();
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const userId = 1;
      const pictureId = 1;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(null);
      jest.spyOn(picturesService, 'findById').mockResolvedValue(null);

      await expect(service.toggleFavorite(userId, pictureId)).rejects.toThrow(NotFoundException);
      await expect(service.toggleFavorite(userId, pictureId)).rejects.toThrow('User or Picture not found');
    });

    it('should throw a NotFoundException if picture is not found', async () => {
      const userId = 1;
      const pictureId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [],
        favorites: [],
      } as User;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(picturesService, 'findById').mockResolvedValue(null);

      await expect(service.toggleFavorite(userId, pictureId)).rejects.toThrow(NotFoundException);
      await expect(service.toggleFavorite(userId, pictureId)).rejects.toThrow('User or Picture not found');
    });

    it('should throw a NotFoundException if both user and picture are not found', async () => {
      const userId = 1;
      const pictureId = 1;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(null);
      jest.spyOn(picturesService, 'findById').mockResolvedValue(null);

      await expect(service.toggleFavorite(userId, pictureId)).rejects.toThrow(NotFoundException);
      await expect(service.toggleFavorite(userId, pictureId)).rejects.toThrow('User or Picture not found');
    });
  });

  describe('getFavoritePictures', () => {
    it('should return favorite pictures with total items', async () => {
      const userId = 1;
      const page = 1;
      const limit = 2;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [],
        favorites: [],
      } as User;
      const picture: Picture = {
        id: 1,
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
        createdAt: new Date(),
        user,
      } as Picture;
      const favorite: Favorite = { id: 1, user, picture } as Favorite;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(favoriteRepository, 'findAndCount').mockResolvedValue([[favorite], 1]);

      const result = await service.getFavoritePictures(userId, page, limit);

      expect(usersService.findUserById).toHaveBeenCalledWith(userId);
      expect(favoriteRepository.findAndCount).toHaveBeenCalledWith({
        where: { user },
        relations: ['picture', 'picture.user'],
        skip: (page - 1) * limit,
        take: limit,
      });
      expect(result).toEqual({
        pictures: [
          {
            ...picture,
            user,
            isFavorite: true,
          },
        ],
        totalItems: 1,
      });
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const userId = 1;
      const page = 1;
      const limit = 2;

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(null);

      await expect(service.getFavoritePictures(userId, page, limit)).rejects.toThrow(NotFoundException);
      await expect(service.getFavoritePictures(userId, page, limit)).rejects.toThrow('User not found');
    });
  });
});
