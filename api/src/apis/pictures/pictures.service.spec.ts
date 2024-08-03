import { Test, TestingModule } from '@nestjs/testing';
import { PicturesService } from './pictures.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Picture } from '../../database/entities/picture.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UsersService } from '../users/users.service';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { Favorite } from '../../database/entities/favorite.entity';

describe('PicturesService', () => {
  let service: PicturesService;
  let picturesRepository: Repository<Picture>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PicturesService,
        {
          provide: getRepositoryToken(Picture),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PicturesService>(PicturesService);
    picturesRepository = module.get<Repository<Picture>>(getRepositoryToken(Picture));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPicture', () => {
    it('should create a picture', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };
      const userId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [] as Picture[],
        favorites: [] as Favorite[],
      };
      const picture: Picture = {
        id: 1,
        createdAt: new Date(),
        url: createPictureDto.url,
        title: createPictureDto.title,
        user,
      };

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(picturesRepository, 'create').mockReturnValue(picture);
      jest.spyOn(picturesRepository, 'save').mockResolvedValue(picture);

      const result = await service.createPicture(createPictureDto, userId);

      expect(usersService.findUserById).toHaveBeenCalledWith(userId);
      expect(picturesRepository.create).toHaveBeenCalledWith({ ...createPictureDto, user });
      expect(picturesRepository.save).toHaveBeenCalledWith(picture);
      expect(result).toEqual(picture);
    });

    it('should throw an InternalServerErrorException if there is an error creating the picture', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };
      const userId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [] as Picture[],
        favorites: [] as Favorite[],
      };

      jest.spyOn(usersService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(picturesRepository, 'create').mockReturnValue({
        ...createPictureDto,
        user,
        id: 0, // Temporary id
        createdAt: new Date(), // Temporary createdAt
      } as Picture);
      jest.spyOn(picturesRepository, 'save').mockRejectedValue(new Error('Error saving picture'));

      await expect(service.createPicture(createPictureDto, userId)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getPictures', () => {
    it('should return pictures with pagination', async () => {
      const page = 1;
      const limit = 10;
      const totalItems = 15;
      const userId = 1;
      const user: User = {
        id: userId,
        username: 'testuser',
        pictures: [] as Picture[],
        favorites: [] as Favorite[],
      };
      const pictures: Picture[] = [
        {
          id: 1,
          createdAt: new Date(),
          url: 'http://example.com/picture1.jpg',
          title: 'Picture 1',
          user,
        },
        {
          id: 2,
          createdAt: new Date(),
          url: 'http://example.com/picture2.jpg',
          title: 'Picture 2',
          user,
        },
      ];

      jest.spyOn(picturesRepository, 'findAndCount').mockResolvedValueOnce([pictures, totalItems]);

      const result = await service.getPictures(page, limit);

      expect(result.pictures).toEqual(pictures);
      expect(result.totalItems).toEqual(totalItems);
    });

    it('should throw an InternalServerErrorException if there is an error fetching pictures', async () => {
      const page = 1;
      const limit = 10;

      jest.spyOn(picturesRepository, 'findAndCount').mockRejectedValueOnce(new Error('Error fetching pictures'));

      await expect(service.getPictures(page, limit)).rejects.toThrow(new InternalServerErrorException('Error fetching pictures'));
    });
  });
});
