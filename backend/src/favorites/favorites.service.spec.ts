// backend/src/favorites/favorites.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.entity';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let repository: Repository<Favorite>;

  // Mock repository
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    repository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAllFavorites', () => {
    it('should return all favorites', async () => {
      const expectedFavorites = [
        {
          imdbID: 'tt0468569',
          Title: 'The Dark Knight',
          Year: '2008',
          Poster: 'https://example.com/poster.jpg',
          createdAt: new Date(),
        },
      ];

      mockRepository.find.mockResolvedValue(expectedFavorites);

      const result = await service.getAllFavorites();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedFavorites);
    });

    it('should return empty array when no favorites', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.getAllFavorites();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('addFavorite', () => {
    const movieData = {
      imdbID: 'tt0111161',
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Poster: 'https://example.com/poster.jpg',
    };

    it('should add a new favorite successfully', async () => {
      const createdFavorite = {
        ...movieData,
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(null); // No existing favorite
      mockRepository.create.mockReturnValue(createdFavorite);
      mockRepository.save.mockResolvedValue(createdFavorite);

      const result = await service.addFavorite(movieData);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { imdbID: movieData.imdbID }
      });
      expect(repository.create).toHaveBeenCalledWith({
        imdbID: movieData.imdbID,
        Title: movieData.Title,
        Year: movieData.Year,
        Poster: movieData.Poster,
      });
      expect(repository.save).toHaveBeenCalledWith(createdFavorite);
      expect(result).toEqual(createdFavorite);
    });

    it('should return error when movie already exists', async () => {
      const existingFavorite = {
        ...movieData,
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(existingFavorite);

      const result = await service.addFavorite(movieData);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { imdbID: movieData.imdbID }
      });
      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
      expect(result).toEqual({ error: 'Movie already in favorites' });
    });
  });

  describe('removeFavorite', () => {
    const imdbID = 'tt0111161';

    it('should remove favorite successfully', async () => {
      const existingFavorite = {
        imdbID,
        Title: 'Test Movie',
        Year: '1994',
        Poster: null,
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(existingFavorite);
      mockRepository.remove.mockResolvedValue(existingFavorite);

      const result = await service.removeFavorite(imdbID);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { imdbID }
      });
      expect(repository.remove).toHaveBeenCalledWith(existingFavorite);
      expect(result).toEqual({ success: true });
    });

    it('should return error when favorite not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.removeFavorite(imdbID);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { imdbID }
      });
      expect(repository.remove).not.toHaveBeenCalled();
      expect(result).toEqual({ error: 'Movie not found in favorites' });
    });
  });
});