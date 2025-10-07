// frontend/app/page.tsx
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { searchMovies, getFavorites, addFavorite, removeFavorite, Movie } from '@/lib/api';
import { MovieCard } from '@/components/MovieCard';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  // Use useInfiniteQuery for pagination
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['search', searchQuery],
    queryFn: ({ pageParam = 1 }) => searchMovies(searchQuery, pageParam),
    getNextPageParam: (lastPage) => {
      // Return next page number if there are more pages
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: searchQuery.length > 0,
    initialPageParam: 1,
  });

  // Get favorites to check status
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  // Add to favorites
  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  // Remove from favorites
  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (imdbID: string) => {
    return favorites.some((fav: Movie) => fav.imdbID === imdbID);
  };

  const handleToggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.imdbID)) {
      removeMutation.mutate(movie.imdbID);
    } else {
      addMutation.mutate(movie);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Reset pagination when search query changes
    if (value !== searchQuery) {
      queryClient.removeQueries({ queryKey: ['search', searchQuery] });
    }
  };

  // Flatten all pages of movies
  const allMovies = data?.pages.flatMap(page => page.movies) ?? [];
  const totalResults = data?.pages[0]?.totalResults ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Results count */}
      {totalResults > 0 && (
        <p className="text-gray-600 mb-4">
          Showing {allMovies.length} of {totalResults} results
        </p>
      )}

      {/* Loading state for initial load */}
      {isLoading && <p>Loading...</p>}

      {/* Error handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: Failed to search movies
        </div>
      )}

      {/* API error */}
      {data?.pages[0]?.error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {data.pages[0].error}
        </div>
      )}

      {/* Empty state */}
      {allMovies.length === 0 && !isLoading && searchQuery.length > 0 && (
        <p className="text-gray-500">No movies found</p>
      )}

      {/* Movie grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {allMovies.map((movie: Movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={isFavorite(movie.imdbID)}
            onToggleFavorite={() => handleToggleFavorite(movie)}
          />
        ))}
      </div>

      {/* Load More button */}
      {hasNextPage && (
        <div className="text-center mb-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading more...
              </span>
            ) : (
              `Load More (${totalResults - allMovies.length} remaining)`
            )}
          </button>
        </div>
      )}
    </div>
  );
}