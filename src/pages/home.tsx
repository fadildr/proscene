import React from "react";
import HeaderHome from "../components/headerHome";
import Card from "../components/card";
import { Link } from "react-router-dom";
import { useTrending, useMovies, useSeries } from "../service/movies";

export default function Home() {
  const { data: trendingData, isLoading: trendingLoading } = useTrending();
  const { data: moviesData, isLoading: moviesLoading } = useMovies();
  const { data: seriesData, isLoading: seriesLoading } = useSeries();

  // Check if data is available before accessing properties
  const dataTrending = Array.isArray(trendingData?.results)
    ? trendingData.results.slice(0, 10)
    : [];
  const dataMovies = Array.isArray(moviesData?.results)
    ? moviesData.results.slice(0, 10)
    : [];
  const dataSeries = Array.isArray(seriesData?.results)
    ? seriesData?.results.slice(0, 10)
    : [];
  return (
    <>
      <HeaderHome />
      <div className="mt-20">
        <div className="mb-12 " id="trending">
          <div className="container flex justify-between mx-auto px-0 mb-10">
            <h1 className="text-[30px] font-bold">Trending</h1>
            <Link
              to="/trending"
              className="text-[20px] underline text-primary-700 cursor-pointer"
            >
              See all trending
            </Link>
          </div>
          <div className="container-fluid mx-auto px-0">
            <div className="flex overflow-x-scroll  gap-7 scrollbar-hide">
              {dataTrending.map((movie, index) => (
                <div
                  className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ${
                    index === 0 ? "ml-4 md:ml-24" : ""
                  }`}
                  key={movie.id}
                >
                  <Card
                    imageSrc={movie.poster_path}
                    title={movie.title || movie.name}
                    description={movie.overview}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-12" id="movies">
          <div className="container flex justify-between mx-auto px-0 mb-10">
            <h1 className="text-[30px] font-bold">Movies</h1>
            <Link
              to="/movies"
              className="text-[20px] underline text-primary-700 cursor-pointer"
            >
              See all movies
            </Link>
          </div>
          <div className="container-fluid mx-auto px-0">
            <div className="flex overflow-x-scroll  gap-7 scrollbar-hide">
              {dataMovies.map((movie, index) => (
                <div
                  className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ${
                    index === 0 ? "ml-4 md:ml-24" : ""
                  }`}
                  key={movie.id}
                >
                  <Card
                    imageSrc={movie.poster_path}
                    title={movie.title}
                    description={movie.overview}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-12" id="series">
          <div className="container flex justify-between mx-auto px-0 mb-10">
            <h1 className="text-[30px] font-bold">TV Series</h1>
            <Link
              to="/series"
              className="text-[20px] underline text-primary-700 cursor-pointer"
            >
              See all series
            </Link>
          </div>
          <div className="container-fluid mx-auto px-0">
            <div className="flex overflow-x-scroll  gap-7 scrollbar-hide">
              {dataSeries.map((series, index) => (
                <div
                  className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ${
                    index === 0 ? "ml-4 md:ml-24" : ""
                  }`}
                  key={series.id}
                >
                  <Card
                    imageSrc={series.poster_path}
                    title={series.name}
                    description={series.overview}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
