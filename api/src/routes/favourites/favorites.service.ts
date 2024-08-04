import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../database/entities/favorite.entity';
import { PicturesService } from '../pictures/pictures.service';
import { UsersService } from '../users/users.service';

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
      console.log("deleting")
      return;
    }

    favorite = this.favoriteRepository.create({ user, picture });
    await this.favoriteRepository.save(favorite);

  }
}
