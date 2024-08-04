import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './routes/health/health.controller';
import { User } from './database/entities/user.entity';
import { Picture } from './database/entities/picture.entity';
import { Favorite } from './database/entities/favorite.entity';
import { UsersModule } from './routes/users/users.module';
import { PicturesModule } from './routes/pictures/pictures.module';
import { FavoritesModule } from './routes/favourites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Picture, Favorite],
      synchronize: true,
    }),
    UsersModule,
    PicturesModule,
    FavoritesModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
