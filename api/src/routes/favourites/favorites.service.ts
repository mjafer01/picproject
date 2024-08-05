import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from '../../database/entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PicturesService } from '../pictures/pictures.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly usersService: UsersService,
    private readonly picturesService: PicturesService,
  ) {}

  async toggleFavorite(userId: number, pictureId: number): Promise<void> {
    const user = await this.usersService.findUserById(userId);
    const picture = await this.picturesService.findById(pictureId);

    if (!user || !picture) {
      throw new NotFoundException('User or Picture not found');
    }

    let favorite = await this.favoriteRepository.findOne({ where: { user, picture } });

    if (favorite) {
      await this.favoriteRepository.delete(favorite.id);
      return;
    }

    favorite = this.favoriteRepository.create({ user, picture });
    await this.favoriteRepository.save(favorite);
  }

  async getFavoritePictures(userId: number, page: number, limit: number): Promise<{ pictures: any[], totalItems: number }> {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const offset = (page - 1) * limit;
    const [favorites, totalItems] = await this.favoriteRepository.findAndCount({
      where: { user },
      relations: ['picture', 'picture.user'],
      skip: offset,
      take: limit,
    });

    const pictures = favorites.map(favorite => {
      return {
        ...favorite.picture,
        user: favorite.picture.user,
        isFavorite:true
      };
    });

    return { pictures, totalItems };
  }
}
