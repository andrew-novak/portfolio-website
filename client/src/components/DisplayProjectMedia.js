import { useTheme, Box, Typography } from "@mui/material";
import { Player } from "video-react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import useWindowDimensions from "hooks/useWindowDimensions";
import VideoPlayer from "components/VideoPlayer";

const DisplayProjectImage = ({
  media,
  degrees: passedDegrees,
  color1: passedColor1,
  color2: passedColor2,
}) => {
  const theme = useTheme();

  const mediaUrl = media?.clientLocalUrl || media?.serverUrl || null;
  const mediaDisplayType = media?.displayType || null;

  const degrees = passedDegrees || theme.custom.colors.neutralGradientDegrees;
  const color1 = passedColor1 || theme.custom.colors.neutral1;
  const color2 = passedColor2 || theme.custom.colors.neutral2;

  const { width: windowWidth } = useWindowDimensions();
  const maxImgWidth = 800;
  const fullScreenImageWidth = 600;
  const isMobile = windowWidth * 0.9 < maxImgWidth;
  const isVeryMobile = windowWidth < fullScreenImageWidth;
  const width = isVeryMobile ? "100%" : isMobile ? "90%" : maxImgWidth;
  const squareHeight = isVeryMobile
    ? windowWidth
    : isMobile
    ? windowWidth * 0.9
    : maxImgWidth;
  const height = squareHeight;
  //const height =
  //  mediaDisplayType === "video" ? squareHeight * 0.5625 : squareHeight;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        //marginBottom: index > 0 ? (isVeryMobile ? 20 : 50) : 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "calc(100% - 80px)",
          width: "100%",
          background: `linear-gradient(${degrees}, ${color1} 0%, ${color2} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          height: height - 80,
          width: "100%",
          background: color1,
          background: `linear-gradient(${degrees}, ${color1} 0%, ${color2} 100%)`,
        }}
      />
      {mediaDisplayType === "video" && (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width,
            backgroundColor: "rgb(230, 230, 230)",
            boxShadow: isVeryMobile ? 0 : 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            objectFit: "cover",
          }}
        >
          <VideoPlayer src={mediaUrl} />
        </Box>
      )}
      {mediaDisplayType !== "video" && (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width,
            backgroundColor: "rgb(230, 230, 230)",
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            boxShadow: isVeryMobile ? 0 : 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!mediaUrl && (
            <>
              <ImageNotSupportedIcon sx={{ fontSize: 100 }} />
              <Typography sx={{ fontSize: 40 }}>No Media</Typography>
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default DisplayProjectImage;
