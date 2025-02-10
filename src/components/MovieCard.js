import React, { useState } from "react";
import { IMG_CDN } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (!posterPath) return null;
  return (
    <Link to={"/watch?v=" + id}>
      <div
        className="w-[120px] md:w-[170px] hover:scale-90 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img alt="movie-poster" src={IMG_CDN + posterPath} />
      </div>
    </Link>
  );
};

export default MovieCard;
