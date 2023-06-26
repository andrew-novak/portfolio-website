import { useRef, useState, useEffect } from "react";
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
    <Player
      playsInline
      aspectRatio="1:1"
      onPlay={handlePlay}
      onPause={handlePause}
      {...props}
    >
      {!isVideoPlaying && (
        <VideoCoverOverlay style={{ zIndex: 1, pointerEvents: "none" }} />
      )}
      <BigPlayButton position="center" />
    </Player>
  );
};

export default MyVideoPlayer;
