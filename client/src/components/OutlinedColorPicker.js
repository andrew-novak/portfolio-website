import { useState } from "react";
import { useTheme, Button, Typography } from "@mui/material";

const OutlinedColorPicker = ({ label, color, fullWidth, onClick }) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;
  return (
    <Button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      variant="outlined"
      fullWidth
      sx={{
        justifyContent: "flex-start",
        border: `solid 1px ${outlineColor}`,
        padding: 0,
        textTransform: "none",
      }}
      onClick={onClick}
    >
      <div
        style={{
          height: 54,
          width: 54,
          background: color,
          borderRadius: 3,
          borderRight: `solid 1px ${outlineColor}`,
        }}
      />
      <Typography sx={theme.custom.styles.inputLabel}>
        {label || "Color Picker"}
      </Typography>
    </Button>
  );
};

export default OutlinedColorPicker;
