import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbAccessToken = import.meta.env.VITE_TMDB_TOKEN_API_KEY;

  const requestOptions: { params?: Record<string, any>; headers: Record<string, string> } = {
    headers: {
      accept: 'application/json',
    },
  };

  if (tmdbApiKey) {
    requestOptions.params = {
      api_key: tmdbApiKey,
      include_adult: false,
      language: 'en-US',
      page: 1,
      query,
    };
  } else if (tmdbAccessToken) {
    requestOptions.headers.Authorization = `Bearer ${tmdbAccessToken}`;
    requestOptions.params = {
      include_adult: false,
      language: 'en-US',
      page: 1,
      query,
    };
  }

  try {
    const response = await axios.get<TMDBResponse>('https://api.themoviedb.org/3/search/movie', requestOptions);

    console.log('[movieService] TMDB response:', response.data);

    return response.data.results;
  } catch (error) {
    console.error('[movieService] TMDB error:', error);
    throw error;
  }
}
