import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Picture } from './picture.entity';
import { Favorite } from './favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Picture, picture => picture.user)
  pictures: Picture[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];
}
