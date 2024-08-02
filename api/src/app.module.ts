import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './apis/health/health.controller';
import { User } from './database/entities/user.entity';
import { Picture } from './database/entities/picture.entity';
import { Favorite } from './database/entities/favorite.entity';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Picture, Favorite],
      synchronize: true,
    }),
    UsersModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
