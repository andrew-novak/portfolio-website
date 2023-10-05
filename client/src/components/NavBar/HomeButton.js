import { /*useLocation,*/ useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { WEBSITE_NAME } from "../../constants/general";
import logo from "./logo.png";

const HomeButton = ({ min380px, min450px, smUp }) => {
  //const location = useLocation();
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
      <img
        style={{
          height: smUp ? 50 : 46,
          marginRight: 10,
          borderRadius: "100%",
        }}
        alt="logo"
        src={logo}
      />
      <Typography
        sx={{
          lineHeight: 2,
          fontFamily: "Sansita Swashed, cursive",
          fontSize: smUp ? 28 : min450px ? 24 : min380px ? 20 : 18,
          letterSpacing: 2,
          color: "#3E003F",

          /*
          For gradient text:

          // Doesnt do anything visible, but
          // necessary for gradient to work
          background: 0,
          WebkitBackgroundClip: "text",
          textFillColor: "transparent",
          //background: "rgba(0, 0, 0, 87)",
          background: "#3E003F",
          */
        }}
        color="inherit"
      >
        {WEBSITE_NAME}
      </Typography>
    </div>
  );
};

export default HomeButton;
