import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constant";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);

    const json = await data.json();

    setVideos(json.items);

    // console.log("json", json);
  };

  return (
    <div className="flex flex-wrap">
      {videos[0] && <AdVideoCard info={videos[0]} />}
      {videos.map((info) => {
        return (
          <Link key={info.id} to={"/watch?v=" + info.id}>
            <VideoCard info={info} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
