import React from "react";
import GptSeachBar from "./GptSeachBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { Background_Url } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <img
        className="fixed -z-10  h-screen w-screen object-cover"
        src={Background_Url}
        alt="Background Img"
      />
      <div>
        <GptSeachBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;
