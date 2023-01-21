import React, { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { connect } from "react-redux";

import { logout } from "actions/admin/auth";
import HomeButton from "./HomeButton";

const NavBar = ({ isAdminMode, logout }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Fragment>
      <AppBar sx={{ background: "rgb(255, 255, 255)" }}>
        <Toolbar>
          <HomeButton />
          <div style={{ flexGrow: 1 }} />
          <Button
            disabled={location.pathname === "/contact"}
            startIcon={<EmailIcon />}
            sx={{ marginRight: theme.spacing(2) }}
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>
          {isAdminMode && (
            <Button
              startIcon={<LogoutIcon />}
              sx={{ marginRight: theme.spacing(2) }}
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
