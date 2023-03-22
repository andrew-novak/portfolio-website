import { Box, Typography } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import useWindowDimensions from "hooks/useWindowDimensions";

const DisplayProjectImage = ({
  imageUrl,
  degrees: passedDegrees,
  color1: passedColor1,
  color2: passedColor2,
}) => {
  const degrees = passedDegrees || "30deg";
  const color1 = passedColor1 || "#f8f1ff";
  const color2 = passedColor2 || "#eff2fc";

  const { width: windowWidth } = useWindowDimensions();
  const maxImgWidth = 800;
  const fullScreenImageWidth = 600;
  const isMobile = windowWidth * 0.9 < maxImgWidth;
  const isVeryMobile = windowWidth < fullScreenImageWidth;
  const width = isVeryMobile ? "100%" : isMobile ? "90%" : maxImgWidth;
  const height = isVeryMobile
    ? windowWidth
    : isMobile
    ? windowWidth * 0.9
    : maxImgWidth;

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
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width,
          backgroundColor: "rgb(230, 230, 230)",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          boxShadow: isVeryMobile ? 0 : 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!imageUrl && (
          <>
            <ImageNotSupportedIcon sx={{ fontSize: 100 }} />
            <Typography sx={{ fontSize: 40 }}>No Image</Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default DisplayProjectImage;
