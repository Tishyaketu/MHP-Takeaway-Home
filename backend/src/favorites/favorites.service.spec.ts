// backend/src/favorites/favorites.service.spec.ts
import { Test } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FavoritesService],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  // M7: Basic unit test
  it('should have seed data', () => {
    const favorites = service.getAllFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].imdbID).toBe('tt0468569');
  });

  it('should add a favorite', () => {
    const movie = {
      imdbID: 'tt0111161',
      Title: 'Test Movie',
      Year: '1994',
      Poster: null,
    };
    
    service.addFavorite(movie);
    const favorites = service.getAllFavorites();
    expect(favorites.length).toBe(2);
  });
});