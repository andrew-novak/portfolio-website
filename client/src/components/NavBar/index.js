import React, { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, AppBar, Toolbar, Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { connect } from "react-redux";

import { logout } from "actions/admin/auth";
import HomeButton from "./HomeButton";

const NavBar = ({ isAdminMode, logout }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isLargerThanSm = useMediaQuery(theme.breakpoints.up("sm"));
  const iconSize = isLargerThanSm ? 20 : 17;
  const fontSize = isLargerThanSm ? 14 : 14;
  const marginRight = isLargerThanSm ? theme.spacing(2) : 0;
  return (
    <Fragment>
      <AppBar sx={{ background: "rgb(255, 255, 255)" }}>
        <Toolbar>
          <div style={{ marginRight }} />
          <HomeButton />
          <div style={{ flexGrow: 1 }} />
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
          {isAdminMode && (
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
        </Toolbar>
      </AppBar>
      <Box sx={theme.mixins.toolbar} />
    </Fragment>
  );
};

const mapState = (state) => {
  const isAdminMode = state.adminAuth.isLoggedIn;
  return { isAdminMode };
};

export default connect(mapState, { logout })(NavBar);
