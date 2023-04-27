import { useState } from "react";
import { useTheme, IconButton, Button, Typography } from "@mui/material";

const OutlinedIconPicker = ({ label, buttons, onClick }) => {
  const theme = useTheme();

  const iconSize = 40;

  const [selected, setSelected] = useState(null);

  const handleClick = (value) => {
    setSelected(value);
    onClick && onClick(value);
  };

  return (
    <div
      style={{
        width: "100%",
        border: "solid 1px",
        borderColor: theme.custom.colors.outline,
        borderRadius: theme.custom.cssProps.outlineBorderRadius,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          ...theme.custom.styles.inputLabel,
          borderBottom: "solid 1px",
          borderColor: theme.custom.colors.outline,
        }}
      >
        {label || "Icon Picker"}
      </Typography>
      {/* Icons Container */}
      <div
        style={{
          padding: theme.custom.cssProps.outlinePadding,
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing(2),
        }}
      >
        {(buttons || []).map(({ MuiIcon, value }, index) => (
          <IconButton
            key={index}
            sx={{
              border: "solid 1px",
              borderRadius: theme.custom.cssProps.outlineBorderRadius,
              borderColor: theme.custom.colors.outlineLight,
              // On Hover
              "&:hover": {
                borderColor: theme.custom.colors.outlineHover,
              },
              // On Selected
              ...(selected === value ? theme.custom.styles.outlineFocus : {}),
            }}
            onClick={() => handleClick(value)}
          >
            {MuiIcon ? (
              <MuiIcon sx={{ fontSize: iconSize }} />
            ) : (
              // When No Icon
              <div style={{ height: iconSize, width: iconSize }} />
            )}
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default OutlinedIconPicker;
