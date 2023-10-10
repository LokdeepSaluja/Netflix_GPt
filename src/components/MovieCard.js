import React from "react";
import { TMDB_Image_Url } from "../utils/constants";

const MovieCard = ({ movie }) => {
  if (!movie.poster_path) return null;
  return (
    <div className="w-36 pr-4 md:w-44">
      <img
        className=""
        src={TMDB_Image_Url + movie.poster_path}
        alt="img"
      ></img>
    </div>
  );
};

export default MovieCard;
