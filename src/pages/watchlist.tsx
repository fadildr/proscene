import React, { useState, useEffect } from "react";
import Card from "../components/card";
import SearchInput from "../components/searchInput";
import Dropdown from "../components/dropdown";
import { MovieInfo } from "../types/movie";

const WatchlistPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<MovieInfo[]>([]);

  // Load watchlist from local storage on component mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );
    setFilteredData(storedWatchlist);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterData(query, selectedFilter);
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
    filterData(searchQuery, newFilter);
  };

  const filterData = (query: string, filter: string) => {
    const storedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );

    const filtered = storedWatchlist.filter((item: MovieInfo) => {
      const itemName = item.title || item.original_name;
      let newFilter = "";
      if (filter === "Movies") {
        newFilter = "movie";
      } else if (filter === "TV") {
        newFilter = "tv";
      } else {
        newFilter = "All";
      }
      console.log(newFilter);
      return (
        (newFilter === "All" || item.type === newFilter) &&
        (query === "" || itemName.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  };
  console.log(filteredData);

  return (
    <>
      <div className="w-full fixed backdrop-blur blur-10 pb-0 top-0">
        <div className="w-3/4 mx-auto mt-20 mb-10 flex gap-5 items-center justify-center">
          <SearchInput
            onSearch={handleSearch}
            placeHolder="Search watchlist..."
          />
          <Dropdown
            filterOptions={["All", "Movies", "TV"]}
            selectedFilter={selectedFilter}
            // isDisabled={searchQuery ? true : false}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="mt-44">
        <div className="container mx-auto px-0 lg:px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {filteredData.length > 0 ? (
              filteredData.map((watchlist: MovieInfo) => (
                <div
                  key={watchlist.id}
                  className="mx-auto px-0 flex justify-center "
                >
                  <Card
                    id={watchlist.id}
                    type={watchlist.type}
                    imageSrc={watchlist.poster_path}
                    title={watchlist.title || watchlist.original_name}
                    description={watchlist.overview}
                  />
                </div>
              ))
            ) : (
              <div>data not found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WatchlistPage;
