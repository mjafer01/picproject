import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from '../../database/entities/picture.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    private usersService: UsersService,
  ) {}

  async getPictures(page: number, limit: number): Promise<{ pictures: Picture[], totalItems: number }> {
    const offset = (page - 1) * limit;
    const [pictures, totalItems] = await this.picturesRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });

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
