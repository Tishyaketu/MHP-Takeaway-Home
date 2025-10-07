// backend/src/favorites/favorites.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async getAllFavorites() {
    return await this.favoritesRepository.find();
  }

  async addFavorite(movie: any) {
    const existingFavorite = await this.favoritesRepository.findOne({
      where: { imdbID: movie.imdbID }
    });
    
    if (existingFavorite) {
      return { error: 'Movie already in favorites' };
    }

    const favorite = this.favoritesRepository.create({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
    });

    return await this.favoritesRepository.save(favorite);
  }

  async removeFavorite(imdbID: string) {
    const favorite = await this.favoritesRepository.findOne({
      where: { imdbID }
    });
    
    if (!favorite) {
      return { error: 'Movie not found in favorites' };
    }

    await this.favoritesRepository.remove(favorite);
    return { success: true };
  }
}