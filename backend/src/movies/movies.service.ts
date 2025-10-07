// backend/src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly apiKey = process.env.OMDB_API_KEY || '';
  private readonly baseUrl = process.env.OMDB_BASE_URL || '';

  async searchMovies(query: string, page: number = 1) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          s: query,
          type: 'movie',
          page: page, // Add page parameter
        },
      });

      if (response.data.Response === 'False') {
        if (response.data.Error === 'Movie not found!') {
          return { 
            movies: [], 
            totalResults: 0,
            currentPage: page,
            totalPages: 0 
          };
        }
        return { 
          movies: [], 
          error: response.data.Error,
          totalResults: 0,
          currentPage: page,
          totalPages: 0 
        };
      }

      const movies = response.data.Search.map((movie: any) => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster === 'N/A' ? null : movie.Poster,
      }));

      // OMDb returns 10 results per page
      const totalResults = parseInt(response.data.totalResults) || 0;
      const totalPages = Math.ceil(totalResults / 10);

      return { 
        movies,
        totalResults,
        currentPage: page,
        totalPages
      };
    } catch (error) {
      console.error('OMDb API error:', error);
      return { 
        movies: [], 
        error: 'Failed to fetch movies',
        totalResults: 0,
        currentPage: page,
        totalPages: 0 
      };
    }
  }
}