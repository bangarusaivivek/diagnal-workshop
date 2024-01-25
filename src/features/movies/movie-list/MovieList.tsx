import React, { useState, useEffect, useCallback } from "react";
import styles from "./MovieList.module.scss";
import { Header } from "../components/header";
import { IMAGE_BASE_URL } from "../constants";
import { useGetMoviesList } from "../api/movies";
import { MoviesData } from "../api/typings";
import { MovieCard } from "./movie-card";

const MovieList = () => {
  const [moviesData, setMoviesData] = useState<
    Array<{ name: string; "poster-image": string }>
  >([]);
  const [filteredMoviesData, setFilteredMoviesData] = useState<
    Array<{ name: string; "poster-image": string }>
  >([]);

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<{
    totalItems: number;
    totalItemsFetched: number;
    title: string;
  }>({
    title: "",
    totalItems: 0,
    totalItemsFetched: 0,
  });
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSuccess = (data: MoviesData) => {
    const newData = data.page["content-items"].content.map((item) => item);
    setMoviesData((prev) => [...prev, ...newData]);
    setPageData((prev) => {
      return {
        title: data.page.title,
        totalItems: Number(data.page["total-content-items"]),
        totalItemsFetched:
          prev?.totalItemsFetched + Number(data.page["page-size-returned"]),
      };
    });
  };

  useEffect(() => {
    setFilteredMoviesData(moviesData); // update filter data when new moviesData appended
  }, [moviesData]);

  // custom hook to call api
  useGetMoviesList({
    page,
    onSuccess: handleSuccess,
  });

  // handles scroll behaviour when it reaches end it updates the state to call api.
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      !isFiltering &&
      pageData.totalItemsFetched < pageData.totalItems &&
      scrollTop + clientHeight + 200 >= scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFiltering, pageData.totalItems, pageData.totalItemsFetched]);

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // handle search query and updates filtered data
  const handleSearch = (query: string, open: boolean) => {
    setIsFiltering(open);
    const filteredMovies = query
      ? moviesData.filter((movie) =>
          movie.name.toLowerCase().includes(query.trim().toLowerCase())
        )
      : moviesData;
    setFilteredMoviesData(filteredMovies);
  };

  return (
    <div className={styles.container}>
      <Header
        title={pageData?.title || ""}
        backIcon={`${IMAGE_BASE_URL}Back.png`}
        searchIcon={`${IMAGE_BASE_URL}search.png`}
        onSearch={handleSearch}
        onBackClick={() => {}}
      />
      <>
        {filteredMoviesData.length === 0 ? (
          <div className={styles.emptyContainer}>No Items Found!</div>
        ) : (
          <div className={styles.movieListContainer}>
            {filteredMoviesData.map((item, index) => {
              return (
                <MovieCard
                  key={`${item.name}-${index}`}
                  name={item.name}
                  poster={item["poster-image"]}
                />
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default React.memo(MovieList);
