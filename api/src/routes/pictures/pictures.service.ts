import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from '../../database/entities/picture.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UsersService } from '../users/users.service';
import { Favorite } from '../../database/entities/favorite.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private usersService: UsersService,
  ) {}

  async findById(pictureId: number): Promise<Picture> {
    return this.picturesRepository.findOne({ where: { id:pictureId } });
  }
  private async isFavorite(userId: number, pictureId: number): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, picture: { id: pictureId } },
    });
    return !!favorite;
  }

  async getPictures(page: number, limit: number, userId?: number): Promise<{ pictures: Picture[], totalItems: number }> {
    const offset = (page - 1) * limit;
    const [pictures, totalItems] = await this.picturesRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    if (userId) {
      const picturesWithFavorites = await Promise.all(pictures.map(async (picture) => {
        const isFavorite = await this.isFavorite(userId, picture.id);
        return { ...picture, isFavorite };
      }));
      return { pictures: picturesWithFavorites, totalItems };
    }

    return { pictures, totalItems };
  }

  async createPicture(createPictureDto: CreatePictureDto, userId: number): Promise<Picture> {
    try {
      const user = await this.usersService.findUserById(userId);
      const picture = this.picturesRepository.create({
        ...createPictureDto,
        user,
      });
      return await this.picturesRepository.save(picture);
    } catch (error) {
      throw new InternalServerErrorException('Error creating picture');
    }
  }
}
