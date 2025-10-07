// backend/src/favorites/favorites.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  // M5: In-memory storage
  private favorites = new Map();

  constructor() {
    // M5: Seed data for testing
    this.favorites.set('tt0468569', {
      imdbID: 'tt0468569',
      Title: 'The Dark Knight',
      Year: '2008',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    });
  }

  getAllFavorites() {
    return Array.from(this.favorites.values());
  }

  addFavorite(movie: any) {
    if (this.favorites.has(movie.imdbID)) {
      return { error: 'Movie already in favorites' };
    }
    this.favorites.set(movie.imdbID, movie);
    return movie;
  }

  removeFavorite(imdbID: string) {
    if (!this.favorites.has(imdbID)) {
      return { error: 'Movie not found in favorites' };
    }
    this.favorites.delete(imdbID);
    return { success: true };
  }
}