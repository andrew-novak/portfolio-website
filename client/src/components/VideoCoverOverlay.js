import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const VideoCoverOverlay = ({ style }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <PlayCircleOutlineIcon style={{ fontSize: "64px", color: "white" }} />
    </div>
  );
};

export default VideoCoverOverlay;
