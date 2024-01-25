import { useEffect, useState } from "react";
import { MoviesData, MoviesDataProps } from "./typings";
import axios from "axios";

const api = axios.create({
  baseURL: "https://test.create.diagnal.com/",
});

export const useGetMoviesList = (props: MoviesDataProps) => {
  const { page, onSuccess } = props;

  const [data, setData] = useState<MoviesData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = `data/page${page}.json`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get<MoviesData>(url);
      setData(response.data);
      onSuccess(response.data); // callback triggers with response data
    } catch (e) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]); // Trigger the effect when the page changes

  // Expose the state and a function to manually refetch the data
  return { data, error, loading, refetch: fetchData };
};
