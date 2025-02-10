import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API } from "../utils/constants";
import { addWatchVideos } from "../utils/moviesSlice";

const useWatchVideos = (movieid) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
          API
        );
        const json = await data.json();
        const filterData = json.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addWatchVideos(trailer));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideo();
  }, [dispatch, movieid]);
};

export default useWatchVideos;
