import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import useWindowDimensions from "hooks/useWindowDimensions";

const MediaSingleInput = ({ title, image, onFileUpload }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.23)";
  const textColor = "rgba(0, 0, 0, 0.6)";
  return (
    <Box
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        border: `solid 1px ${outlineColor}`,
        borderRadius: "4px",
      }}
    >
      <Typography
        align="center"
        sx={{
          color: textColor,
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: "1.4375em",
          letterSpacing: "0.00938em",
          borderBottom: `solid 1px ${outlineColor}`,
          padding: "16.5px 14px",
        }}
      >
        Image
      </Typography>
      <Box
        sx={{
          paddingTop: "100%",
          width: windowWidth < 450 ? windowWidth - 34 : 400,
          backgroundColor: "white",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ borderTop: `solid 1px ${outlineColor}` }}>
        <Button
          fullWidth
          component="label"
          startIcon={<FileUploadIcon />}
          sx={{
            color: textColor,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            padding: "16.5px 14px",
          }}
        >
          Upload File
          <input type="file" hidden onChange={onFileUpload} />
        </Button>
      </div>
    </Box>
  );
};

export default MediaSingleInput;
