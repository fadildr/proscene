import { useQuery } from "react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Function to get TV series
const getSeries = async () => {
  const response = await axios.get(
    `${BASE_URL}discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`
  );
  return response.data;
};

export const useSeries = () => {
  return useQuery("series", getSeries);
};
export const getSeriesByFilter = async (
  filter: string,
  page: number,
  query: string
) => {
  let endpoint = "";

  if (filter) {
    switch (filter) {
      case "Popular":
        endpoint = "tv/popular";
        break;
      case "Top Rated":
        endpoint = "tv/top_rated";
        break;
      case "Airing Today":
        endpoint = "tv/airing_today";
        break;
      case "On the air":
        endpoint = "tv/on_the_air";
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
