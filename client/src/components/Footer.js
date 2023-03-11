import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

import { WEBSITE_NAME } from "../constants/general";

const Footer = ({ maxWidth }) => {
  const theme = useTheme();
  console.log("maxWidth:", typeof maxWidth);
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "rgb(71, 77, 82)",
      }}
    >
      <Container
        maxWidth={typeof maxWidth === "string" && maxWidth}
        sx={{
          ...(typeof maxWidth === "number" && { maxWidth }),
          display: "flex",
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}
      >
        <Typography>&copy; {WEBSITE_NAME}</Typography>
      </Container>
    </div>
  );
};

export default Footer;
