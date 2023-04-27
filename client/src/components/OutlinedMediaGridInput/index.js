import { useState } from "react";
import { useTheme, Box, Typography } from "@mui/material";

import MediaGridInput from "./MediaGridInput";

// This component purpose is only to wrap MediaGridInput
// component with beautifiers like: outline, title
const OutlinedMediaGridInput = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          borderTopLeftRadius: theme.custom.cssProps.outlineBorderRadius,
          borderTopRightRadius: theme.custom.cssProps.outlineBorderRadius,
          border: "solid 1px",
          borderBottomWidth: 0,
          borderColor: theme.custom.colors.outline,
        }}
      >
        <Typography sx={theme.custom.styles.inputLabel}>Media</Typography>
      </div>
      <Box
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: theme.custom.colors.outline,
          "&:hover": {
            borderColor: theme.custom.colors.outlineHover,
          },
        }}
      >
        <MediaGridInput />
      </Box>
    </div>
  );
};

export default OutlinedMediaGridInput;
