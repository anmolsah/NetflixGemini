import { useDispatch } from "react-redux";
import { API } from "../utils/constants";
import { addTopTrendingMovies } from "../utils/moviesSlice";

import { useEffect } from "react";

const useTopTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTopTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API
    );
    const json = await data.json();
    dispatch(addTopTrendingMovies(json.results));
  };

  useEffect(() => {
    getTopTrendingMovies();
  }, []);
};

export default useTopTrendingMovies;
