import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../service/movies";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  genres: { name: string }[];
  overview: string;
  backdrop_path: string;
  poster_path: string;
  runtime: number;
  vote_average: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const maxStars = 5;
  const roundedRating = Math.round(rating / 2); // Adjust the rating scale if needed
  const stars = Array.from({ length: maxStars }, (_, index) => (
    <span
      key={index}
      className={`${
        index < roundedRating ? "text-yellow-400" : "text-gray-300"
      } text-2xl mr-1`}
    >
      ★
    </span>
  ));
  return <>{stars}</>;
};

const MovieDetail: React.FC = () => {
  const { id, type } = useParams<{ id?: string; type?: string }>() || {};
  const {
    data: movie,
    isLoading,
    isError,
  } = useMovieDetails(Number(id), type || "");
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  const addToWatchlist = () => {
    if (movie && !isMovieInWatchlist(movie.id)) {
      // Include the type obtained from useParams in the added data
      const movieWithDetailType = { ...movie, type };
      const updatedWatchlist = [...watchlist, movieWithDetailType];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  const removeFromWatchlist = () => {
    if (movie) {
      const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  const isMovieInWatchlist = (movieId: number) => {
    return watchlist.some((item) => item.id === movieId);
  };

  const backgroundImageStyle = {
    backgroundImage: movie
      ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
      : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={overlayStyle}></div>
      <div className="container mx-auto relative">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : (
          <div className="pt-24">
            <div className="flex flex-col lg:flex-row items-center lg:justify-between content">
              <div className="lg:w-1/3 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-lg h-auto max-h-[550px]"
                />
              </div>
              <div className="m-6 p-5 lg:mt-0 lg:ml-6 lg:w-2/3 text-white  bg-black bg-opacity-50 backdrop-blur-lg  rounded-lg ">
                <h1 className="text-3xl font-semibold mb-4">{movie.title}</h1>
                <p className="text-gray-300 text-sm mb-2">
                  Release Date: {movie.release_date}
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  Genres: {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="text-lg leading-relaxed">{movie.overview}</p>
                <p className="text-gray-300 text-sm mt-4">
                  Runtime: {movie.runtime} minutes
                </p>
                <p className="text-gray-300 text-sm">
                  Average Vote: <StarRating rating={movie.vote_average} />
                </p>
                <div className="mt-4">
                  {isMovieInWatchlist(movie.id) ? (
                    <button
                      onClick={removeFromWatchlist}
                      className="bg-red-500 text-white px-4 py-2 rounded-full mr-2"
                    >
                      Remove from Watchlist
                    </button>
                  ) : (
                    <button
                      onClick={addToWatchlist}
                      className="bg-green-500 text-white px-4 py-2 rounded-full mr-2"
                    >
                      Add to Watchlist
                    </button>
                  )}
                </div>
                {/* Add more movie details here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
