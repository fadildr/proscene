/* eslint-disable */
import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import Card from "../components/card";
import SearchInput from "../components/searchInput";
import Dropdown from "../components/dropdown";
import SmallLoading from "../components/smallLoading";
import useDebounce from "../hooks/useDebounce";
import { getTrendingByFilter } from "../service/trending";
import { MovieInfo } from "../types/movie";

export default function Trending() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<string>("movie");
  const [selectedFilter, setSelectedFilter] = useState<string>("Movies");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);
  const loadMoreRef = useRef(null);
  const [dataTrending, setDataTrending] = useState<MovieInfo[]>([]);
  const filterOptions = ["Movies", "TV Series"];

  const fetchData = async () => {
    try {
      const result = await getTrendingByFilter(
        selectedFilter,
        page,
        debouncedSearchQuery
      );
      if (result) {
        if (page === 1) {
          setDataTrending(result.results);
        } else {
          setDataTrending((prevDataTrending) => [
            ...prevDataTrending,
            ...result.results,
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, isError } = useQuery(
    ["trending", selectedFilter, debouncedSearchQuery, page],
    fetchData,
    {
      enabled: selectedFilter !== "" || debouncedSearchQuery !== "",
    }
  );

  useEffect(() => {
    if (selectedFilter == "Movies") {
      setType("movie");
    } else {
      setType("tv");
    }
  }, [selectedFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const loadMore = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [setPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMore]);

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
    setPage(1);
  };
  return (
    <>
      <div className="w-full fixed backdrop-blur blur-10 pb-0 top-0">
        <div className="w-3/4 mx-auto mt-20 mb-10 flex gap-5 items-center justify-center">
          <SearchInput
            onSearch={handleSearch}
            placeHolder="Search trending..."
          />
          <Dropdown
            filterOptions={filterOptions}
            selectedFilter={selectedFilter}
            isDisabled={searchQuery ? true : false}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="mt-44">
        <div className="container mx-auto px-0 lg:px-5 ">
          {dataTrending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dataTrending.map((trending: MovieInfo) => (
                <div
                  key={trending.id}
                  className="mx-auto px-0 flex justify-center"
                >
                  <Card
                    type={type}
                    isNotHome={true}
                    id={trending.id}
                    imageSrc={trending.poster_path}
                    title={trending.title || trending.original_name}
                    description={trending.overview}
                  />
                </div>
              ))}
            </div>
          ) : isLoading ? (
            <div className="flex justify-center w-full ">
              <SmallLoading />
            </div>
          ) : isError ? (
            <div>Error loading data</div>
          ) : (
            <div className="text-center">Data {searchQuery} not found</div>
          )}

          <div
            ref={loadMoreRef}
            className={`${isLoading && "hidden"} flex justify-center w-full`}
          >
            {dataTrending.length && <SmallLoading />}
          </div>
        </div>
      </div>
    </>
  );
}
