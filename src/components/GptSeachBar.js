import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTION } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSeachBar = () => {
  const searchText = useRef(null);
  const dispatcher = useDispatch();
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );

    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    const gptquery =
      "Act as the Movies Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      " . only give me names of 5 movies, comma seperated  like the example result given ahead .Example Result: Gadar, Sholay, Don, Golmaal , housefull";
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptquery }],
      model: "gpt-3.5-turbo",
    });
    const gptMovies = chatCompletion.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatcher(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  const language = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[35%] md:pt-[6%] flex justify-center">
      <form
        className="bg-black w-11/12 md:w-1/2 grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          ref={searchText}
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSeachBar;
