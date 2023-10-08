import React from "react";
import { TMDB_Image_Url } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="pr-4 w-44">
      <img
        className=""
        src={TMDB_Image_Url + movie.poster_path}
        alt="img"
      ></img>
    </div>
  );
};

export default MovieCard;
