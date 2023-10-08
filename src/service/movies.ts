import { useQuery } from "react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const getMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100`
  );
  return response.data;
};

export const getMoviesByFilter = async (
  filter: string,
  page: number,
  query: string
) => {
  let endpoint = "";

  if (filter) {
    switch (filter) {
      case "Popular":
        endpoint = "movie/popular";
        break;
      case "Top Rated":
        endpoint = "movie/top_rated";
        break;
      case "Upcoming":
        endpoint = "movie/upcoming";
        break;
      case "Now Playing":
        endpoint = "movie/now_playing";
        break;
      default:
        break;
    }
  }

  if (endpoint) {
    if (query) {
      const response = await axios.get(
        `${BASE_URL}search/multi?api_key=${API_KEY}&query=${query}&page=${page}`
      );
      return response.data;
    }
    const response = await axios.get(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`
    );
    return response.data;
  } else {
    return []; // Return an empty array if the filter is not recognized
  }
};

// Use React Query to fetch movies
export const useMovies = () => {
  return useQuery("movies", getMovies);
};

// Use React Query to fetch movies by filter and search query
export const useMoviesByFilter = (
  filter: string,
  page: number,
  query: string
) => {
  return useQuery(["movies", filter, page, query], () =>
    getMoviesByFilter(filter, page, query)
  );
};

// Function to get movie details
const getMovieDetails = async (movieId: number, type: string) => {
  const response = await axios.get(
    `${BASE_URL}${type}/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

// Use React Query to fetch movie details
export const useMovieDetails = (movieId: number, type: string) => {
  return useQuery(["movie", movieId, type], () =>
    getMovieDetails(movieId, type)
  );
};
