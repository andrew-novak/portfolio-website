import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, Typography } from "@mui/material";

import { WEBSITE_NAME } from "../../constants/general";

const HomeButton = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const sm = useMediaQuery("(maxWidth: 450px)");
  const isLargerThanSm = useMediaQuery(theme.breakpoints.up("sm"));

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
      {false && (
        <img
          style={{
            height: isLargerThanSm ? 50 : 46,
            marginRight: 10,
          }}
          alt="logo"
        />
      )}
      {sm ? null : (
        <Typography
          sx={{
            lineHeight: 2,
            fontFamily: "Sansita Swashed, cursive",
            fontSize: isLargerThanSm ? 28 : 24,
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
      )}
    </div>
  );
};

export default HomeButton;
