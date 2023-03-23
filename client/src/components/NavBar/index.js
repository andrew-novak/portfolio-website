import React, { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { connect } from "react-redux";

import { logout } from "actions/admin/auth";
import HomeButton from "./HomeButton";

const NavBar = ({ isAdminLoggedIn, logout }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isLargerThanSm = useMediaQuery(theme.breakpoints.up("sm"));
  const iconSize = isLargerThanSm ? 20 : 17;
  const fontSize = isLargerThanSm ? 14 : 14;
  const marginRight = isLargerThanSm ? theme.spacing(2) : 0;

  const min350px = useMediaQuery("(min-width: 350px)");
  const min450px = useMediaQuery("(min-width: 450px)");
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Fragment>
      <AppBar sx={{ background: "rgb(255, 255, 255)" }}>
        <Toolbar>
          <div style={{ marginRight }} />
          <HomeButton min350px={min350px} min450px={min450px} smUp={smUp} />
          <div style={{ flexGrow: 1 }} />
          {/* Contact Button*/}
          {isLargerThanSm && (
            <Button
              disabled={location.pathname === "/contact"}
              startIcon={
                <EmailIcon style={{ width: iconSize, height: iconSize }} />
              }
              sx={{
                marginRight,
                fontSize,
              }}
              onClick={() => navigate("/contact")}
            >
              Contact
            </Button>
          )}
          {!isLargerThanSm && (
            <IconButton
              disabled={location.pathname === "/contact"}
              sx={{ color: "black" }}
              onClick={() => navigate("/contact")}
            >
              <EmailIcon />
            </IconButton>
          )}
          {/* Logout Button */}
          {isAdminLoggedIn && isLargerThanSm && (
            <Button
              startIcon={
                <LogoutIcon style={{ width: iconSize, height: iconSize }} />
              }
              sx={{
                marginRight,
                fontSize,
              }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          )}
          {isAdminLoggedIn && !isLargerThanSm && (
            <IconButton
              sx={{ color: "black", marginLeft: min350px ? 3 : 0.5 }}
              onClick={() => logout()}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={theme.mixins.toolbar} />
    </Fragment>
  );
};

const mapState = (state) => {
  const { isAdminLoggedIn } = state.adminAuth;
  return { isAdminLoggedIn };
};

export default connect(mapState, { logout })(NavBar);
