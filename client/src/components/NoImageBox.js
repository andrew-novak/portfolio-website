import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const NoImageBox = ({
  text,
  contentSize = 5,
  width = 50,
  height,
  aspectRatio = "1 / 1",
  cursor,
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        width,
        ...(cursor ? { cursor } : null),
        ...(aspectRatio ? { aspectRatio } : { height }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.custom.colors.activityInactive,
        overflow: "hidden",
      }}
    >
      <QuestionMarkIcon sx={{ fontSize: 4 * contentSize, color: "white" }} />
      {text ? (
        <Typography sx={{ fontSize: 3 * contentSize, color: "white" }}>
          {text}
        </Typography>
      ) : null}
    </div>
  );
};

export default NoImageBox;
