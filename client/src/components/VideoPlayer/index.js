import { useState } from "react";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

import "./index.css";
import VideoCoverOverlay from "components/VideoCoverOverlay";

const MyVideoPlayer = (props) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlay = () => {
    setIsVideoPlaying(true);
  };

  const handlePause = (state) => {
    setIsVideoPlaying(false);
  };

  return (
    <Player {...props} onPlay={handlePlay} onPause={handlePause}>
      {!isVideoPlaying && (
        <VideoCoverOverlay style={{ zIndex: 1, pointerEvents: "none" }} />
      )}
      <BigPlayButton position="center" />
    </Player>
  );
};

export default MyVideoPlayer;
