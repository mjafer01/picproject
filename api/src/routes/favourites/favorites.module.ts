import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from '../../database/entities/favorite.entity';
import { UsersModule } from '../users/users.module';
import { PicturesModule } from '../pictures/pictures.module'

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]),UsersModule,PicturesModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
