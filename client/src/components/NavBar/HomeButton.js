import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, Typography } from "@mui/material";

import { WEBSITE_NAME } from "../../constants/general";

const HomeButton = ({ min350px, min450px, smUp }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        //pointerEvents: location.pathname === "/" && "none",
      }}
      onClick={() => navigate("/")}
    >
      {
        /* No Icon For Now */
        false && (
          <img
            style={{
              height: smUp ? 50 : 46,
              marginRight: 10,
            }}
            alt="logo"
          />
        )
      }
      <Typography
        sx={{
          lineHeight: 2,
          fontFamily: "Sansita Swashed, cursive",
          fontSize: smUp ? 28 : min450px ? 24 : min350px ? 20 : 18,
          letterSpacing: 2,
          background: theme.custom.colors.activity,
          WebkitBackgroundClip: "text",
          textFillColor: "transparent",
          background: "rgb(0, 0, 0)",
        }}
        color="inherit"
      >
        {WEBSITE_NAME}
      </Typography>
    </div>
  );
};

export default HomeButton;
