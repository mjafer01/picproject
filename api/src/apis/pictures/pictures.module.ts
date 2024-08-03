import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { Picture } from '../../database/entities/picture.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Picture]),UsersModule],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
