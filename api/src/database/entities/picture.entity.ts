import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Favorite } from './favorite.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, user => user.pictures)
  user: User;

  @OneToMany(() => Favorite, favorite => favorite.picture)
  favorites: Favorite[];
}
