import React from "react";
import useWatchVideos from "./../hooks/useWatchVideos";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import Spinner from "./../spinner/Spinner";
import "../responsive/watch.css";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const movieid = searchParams.get("v");
  useWatchVideos(movieid);
  const wVideo = useSelector((store) => store.movies.WatchVideos);
  return (
    <div className="watch-1 relative w-screen h-screen bg-black flex flex-col justify-center items-center">
      <div className="watch-2 absolute top-0 left-0 right-0 z-20 flex justify-center items-center">
        <Link to="/browse">
          <img
            className="watch-3 w-36 md:w-52 md:hover:scale-90"
            src={LOGO}
            alt="logo"
          />
        </Link>
      </div>
      <div className="relative z-10">
        {!wVideo ? (
          <Spinner />
        ) : (
          <div className="border-4 border-red-500 overflow-hidden rounded-lg">
            <iframe
              className="watching -mt-10 w-[800px] h-[400px] md:w-[1200px] md:h-[600px]"
              src={`https://www.youtube.com/embed/${wVideo?.key}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&vq=hd1080`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watch;
