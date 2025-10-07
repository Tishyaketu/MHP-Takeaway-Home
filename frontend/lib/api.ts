// frontend/lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string | null;
}

export interface SearchResponse {
  movies: Movie[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  error?: string;
}

// Update search to include page parameter
export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const { data } = await axios.get(`${API_URL}/movies/search`, {
    params: { q: query, page },
  });
  return data;
};

// Keep existing favorites functions unchanged
export const getFavorites = async (): Promise<Movie[]> => {
  const { data } = await axios.get(`${API_URL}/favorites`);
  return data;
};

export const addFavorite = async (movie: Movie) => {
  const { data } = await axios.post(`${API_URL}/favorites`, movie);
  return data;
};

export const removeFavorite = async (imdbID: string) => {
  await axios.delete(`${API_URL}/favorites/${imdbID}`);
};