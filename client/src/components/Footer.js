import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Toolbar, Container, Typography } from "@mui/material";

import { WEBSITE_NAME } from "../constants/general";

const Footer = ({ maxWidth }) => {
  const theme = useTheme();
  const isLargerThanSm = useMediaQuery(theme.breakpoints.up("sm"));
  const sidePadding = isLargerThanSm ? theme.spacing(2) : 0;
  return (
    <div
      style={{
        color: "white",
        backgroundColor: theme.palette.primary.main,
        //backgroundColor: "rgb(71, 77, 82)",
        //paddingTop: theme.spacing(2),
        //paddingBottom: theme.spacing(2),
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
      }}
    >
      <Toolbar>
        <Typography>&copy; {WEBSITE_NAME}</Typography>
        {/*<Container
          maxWidth={typeof maxWidth === "string" && maxWidth}
          sx={{
            ...(typeof maxWidth === "number" && { maxWidth }),
            display: "flex",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
          }}
        >
          <Typography>&copy; {WEBSITE_NAME}</Typography>
        </Container>*/}
      </Toolbar>
    </div>
  );
};

export default Footer;
