import { useState } from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import useWindowDimensions from "hooks/useWindowDimensions";

const MediaSingleInput = ({ title, image, onFileUpload }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;
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
          ...theme.custom.styles.inputLabel,
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
