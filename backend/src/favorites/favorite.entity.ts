// backend/src/favorites/favorite.entity.ts
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryColumn()
  imdbID: string;

  @Column()
  Title: string;

  @Column()
  Year: string;

  @Column({ nullable: true })
  Poster: string;

  @CreateDateColumn()
  createdAt: Date;
}
