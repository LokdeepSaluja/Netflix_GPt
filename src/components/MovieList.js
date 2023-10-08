import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-6 ">
      <h1 className="text-2xl p-3 text-white">{title}</h1>
      {/* overflow-x-scroll */}
      <div className="  flex overflow-x-scroll  ">
        <div className=" flex">
          {movies &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
