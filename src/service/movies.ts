import { useQuery } from "react-query";
import axios from "axios";

const API_KEY = "ee4f9d3ad39fa82b4a83dfcff33e1e18";

// Function to get trending items
const getTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

// Function to get movies
const getMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100`
  );
  return response.data;
};

// Function to get TV series
const getSeries = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`
  );
  return response.data;
};
export const getMoviesByFilter = async (
  filter: string,
  page: number,
  query: string
) => {
  console.log(query);
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
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`
      );
      return response.data;
    }
    const response = await axios.get(
      `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&page=${page}`
    );
    return response.data;
  } else {
    return []; // Return an empty array if the filter is not recognized
  }
};

export const useTrending = () => {
  return useQuery("trending", getTrending);
};

export const useMovies = () => {
  return useQuery("movies", getMovies);
};

export const useSeries = () => {
  return useQuery("series", getSeries);
};
