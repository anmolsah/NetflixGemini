import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) {
    return null;
  }
  return (
    <div className="">
      <h1 className="font-semibold text-xl ml-4 py-2 mb-4 text-white border-b-4 border-red-600 w-fit">
        {title}
      </h1>
      <div className="flex overflow-x-scroll no-scrollbar pb-4">
        <div className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              posterPath={movie?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
