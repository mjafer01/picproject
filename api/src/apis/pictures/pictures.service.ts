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
