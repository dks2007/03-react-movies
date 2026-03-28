import type { Movie } from '../types/movie';

interface TMDBResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(query)}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  const data: TMDBResponse = await response.json();

  return data.results;
}
