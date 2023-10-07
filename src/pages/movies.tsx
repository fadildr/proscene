import React, { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../components/header";
import Card from "../components/card";
import SearchInput from "../components/searchInput";
import { getMoviesByFilter } from "../service/movies";
import Dropdown from "../components/dropdown";
import useDebounce from "../hooks/useDebounce";

export default function Movies() {
  const [page, setPage] = useState(1);
  const filterOptions = ["Popular", "Top Rated", "Upcoming", "Now Playing"];
  const [selectedFilter, setSelectedFilter] = useState<string>("Popular");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery(
    ["movies", selectedFilter, debouncedSearchQuery, page],
    () => getMoviesByFilter(selectedFilter, page, debouncedSearchQuery),
    {
      enabled: selectedFilter !== "" || debouncedSearchQuery !== "",
    }
  );

  // Initialize dataMovies as an empty array
  const [dataMovies, setDataMovies] = useState([]);

  // Update dataMovies when movies data changes
  useEffect(() => {
    if (movies && movies.results) {
      if (page === 1) {
        // If it's the first page, set the dataMovies to the new results
        setDataMovies(movies.results);
      } else {
        // If it's not the first page, append the new results to the existing dataMovies
        setDataMovies((prevDataMovies) => [
          ...prevDataMovies,
          ...movies.results,
        ]);
      }
    }
  }, [movies, page]);

  const loadMoreRef = useRef(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset page when a new search is performed
  };

  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [setPage]
  );

  // Create an IntersectionObserver to track when the loadMoreRef element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0, // When the entire target is in view
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMore]);

  console.log(page);

  return (
    <>
      <Header />
      <div className="container mx-auto px-0">
        <div className="w-3/4 mx-auto my-20 flex gap-5 items-center justify-center">
          <SearchInput onSearch={handleSearch} />
          <Dropdown
            filterOptions={filterOptions}
            selectedFilter={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dataMovies.length > 0 ? (
            dataMovies.map((movie, index) => (
              <div key={movie.id} className="mx-auto px-0 flex justify-center">
                <Card
                  isNotHome={true}
                  imageSrc={movie.poster_path}
                  title={movie.title || movie.original_name}
                  description={movie.overview}
                />
              </div>
            ))
          ) : (
            <div>data not found</div>
          )}
        </div>

        {/* Reference for infinite scrolling */}
        <div ref={loadMoreRef}></div>
      </div>
      Movies
    </>
  );
}
