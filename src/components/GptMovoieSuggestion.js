import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import "../responsive/gptMovieSuggestion.css";

const GptMovoieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieResults) return null;
  if (!movieNames) return null;
  return (
    <div className="background p-2 mx-4  bg-gradient-to-tr  from-indigo-900 via-black via-purple-500 to-red-500 -mt-32 text-white opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovoieSuggestion;
