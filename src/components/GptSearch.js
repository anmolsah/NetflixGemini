import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovoieSuggestion from "./GptMovoieSuggestion";
import { BG_IMAGE } from "../utils/constants";
import "../responsive/gptSearch.css";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-30">
        <img src={BG_IMAGE} alt="background-img" className="" />
      </div>
      <GptSearchBar />
      <GptMovoieSuggestion />
    </div>
  );
};

export default GptSearch;
