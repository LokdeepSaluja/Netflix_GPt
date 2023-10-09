import React from "react";
import GptSeachBar from "./GptSeachBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { Background_Url } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <img
        className="absolute -z-10"
        src={Background_Url}
        alt="Background Img"
      />
      <GptSeachBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
