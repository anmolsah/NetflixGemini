import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import genAI from '../utils/gemini';
import { API } from '../utils/constants';
import { addGeminiMovies } from '../utils/gptSlice';
import Spinner from './../spinner/Spinner';
import '../responsive/gptSearchBar.css';

const GptSearchBar = () => {
  const [isLoading,setIsLoading] = useState(false);
  const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) =>{
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie +"&include_adult=false&language=en-US&page=1", API);

      const json = await data.json();

      return json.results;
    }

    const handleGptSearchClick = async() =>{
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
      const geminiQuery = "You are my personal movie recommendation expert. I'm in the mood for something like" + searchText.current.value + ".Recommend 5 movies that capture a similar feel, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
      
      const result = await model.generateContent(geminiQuery);
      const response = await result.response;
      const text = response.text();
      
      const geminiMovies = text.split(",");
      

      const promiseArray = geminiMovies.map(movie => searchMovieTMDB(movie));
      const tmdbResult = await Promise.all(promiseArray);
      dispatch(addGeminiMovies({movieNames:geminiMovies,movieResults:tmdbResult}));

      setIsLoading(false);
    }

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black mt-[-100px]">
    <h1 className="md:text-5xl md:font-bold text-2xl font-semibold mb-8 text-3xl font-bold bg-gradient-to-r from-indigo-800 via-pink-400 via-purple-500 to-red-500 bg-clip-text text-transparent mt-4">Let AI Be Your Personal Movie Guru with Netflix Gemini!</h1>
    <form className="flex items-center rounded-sm bg-gray-200 p-3 shadow-md" onSubmit={(e) => e.preventDefault()}>
      <input 
      ref={searchText}
      type="text"
       className=" md:w-[600px]  w-full bg-transparent focus:outline-none placeholder:text-gray-600 px-4 md:py-4 md:px-4 md:rounded-lg md:text-xl" 
       placeholder={lang[langKey].gptSearchPlaceholder} 
       />
      <button 
      type="button" 
      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full focus:outline-none md:py-4 md:text-lg" 
      onClick={handleGptSearchClick}>
        {lang[langKey].search}
      </button>
    </form>
    {isLoading && <Spinner/>}
  </div>
  )
}

export default GptSearchBar