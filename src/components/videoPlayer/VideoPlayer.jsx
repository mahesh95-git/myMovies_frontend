import "./VideoPlayer.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWatchHistory } from "../../reducer/content.reducer";

function VideoPlayer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [videoPercentage, setVideoPercentage] = useState(0);

  const handleBack = () => {
    const video = document.querySelector(".player");
    const percentageWatched = Math.floor(
      (video.currentTime / video.duration) * 100
    );
    setVideoPercentage(percentageWatched);
    navigate(-1);
  };

  const { id, folder, name, contentname, videoId } = useParams();
  const baseurl = "https://res.cloudinary.com/dyjmwxfb4/video/upload/";

  useEffect(() => {
    dispatch(addWatchHistory({ id: videoId, duration: videoPercentage }));
  }, [dispatch, videoId, videoPercentage]);
  return (
    <div className="container-16">
      <div className="container-16-1">
        <button onClick={handleBack}>
          <img src="/left.png" alt="" />
        </button>
        <span>{contentname}</span>
      </div>
      <div className="container-16-2">
        <video controls autoPlay className="player">
          <source src={baseurl + "/" + id + "/" + folder + "/" + name} />
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;
