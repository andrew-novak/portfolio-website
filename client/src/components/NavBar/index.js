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
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { connect } from "react-redux";

import { logout } from "actions/admin/auth";
import HomeButton from "./HomeButton";
import { GITHUB_URL } from "constants/env";

const NavBar = ({ isAdminLoggedIn, logout }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Menu
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const isMenuOpen = Boolean(menuAnchor);
  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const fontSize = 14;
  const isOnContactScreen = location.pathname === "/contact";

  const isLargerThan750px = useMediaQuery("(min-width: 750px)");
  //const isLargerThan750px = useMediaQuery(theme.breakpoints.up("sm"));
  const iconSize = isLargerThan750px ? 20 : 17;
  const marginRight = isLargerThan750px ? theme.spacing(2) : 0;

  const min380px = useMediaQuery("(min-width: 380px)");

  const min450px = useMediaQuery("(min-width: 450px)");
  const marginLeft = min450px ? 2 : min380px ? 0.5 : 0;

  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const contactClick = () => {
    navigate("/contact");
    isMenuOpen && closeMenu();
  };
  const githubClick = () => {
    if (GITHUB_URL) {
      window.open(GITHUB_URL, "_blank");
    }
    isMenuOpen && closeMenu();
  };
  const logoutClick = () => {
    logout();
    isMenuOpen && closeMenu();
  };

  return (
    <Fragment>
      <AppBar sx={{ background: "rgb(255, 255, 255)" }}>
        <Toolbar
          sx={{
            color: "3E003F",
          }}
        >
          <div style={{ marginRight }} />
          <HomeButton min380px={min380px} min450px={min450px} smUp={smUp} />
          <div style={{ flexGrow: 1 }} />

          {/* Contact Button */}
          {isLargerThan750px && (
            <Button
              disabled={isOnContactScreen}
              startIcon={
                <EmailIcon style={{ width: iconSize, height: iconSize }} />
              }
              sx={{ fontSize, marginRight }}
              onClick={contactClick}
            >
              Contact
            </Button>
          )}
          {min380px && !isLargerThan750px && (
            <IconButton
              disabled={isOnContactScreen}
              sx={{ color: "#525252", marginRight }}
              onClick={contactClick}
            >
              <EmailIcon />
            </IconButton>
          )}

          {/* GitHub Button */}
          {isLargerThan750px && (
            <Button
              startIcon={
                <GitHubIcon style={{ width: iconSize, height: iconSize }} />
              }
              sx={{
                fontSize,
                marginRight,
              }}
              onClick={githubClick}
            >
              GitHub
            </Button>
          )}
          {min380px && !isLargerThan750px && (
            <IconButton
              sx={{
                color: "#525252",
                marginLeft,
                marginRight,
              }}
              onClick={githubClick}
            >
              <GitHubIcon />
            </IconButton>
          )}

          {/* Logout Button */}
          {isAdminLoggedIn && isLargerThan750px && (
            <Button
              startIcon={
                <LogoutIcon style={{ width: iconSize, height: iconSize }} />
              }
              sx={{
                marginRight,
                fontSize,
              }}
              onClick={logoutClick}
            >
              Logout
            </Button>
          )}
          {isAdminLoggedIn && min380px && !isLargerThan750px && (
            <IconButton
              sx={{ color: "#525252", marginLeft }}
              onClick={logoutClick}
            >
              <LogoutIcon />
            </IconButton>
          )}

          {/* Menu Button (Very Small Screen) */}
          {!min380px && (
            <IconButton sx={{ color: "#525252" }} onClick={openMenu}>
              <MenuIcon />
            </IconButton>
          )}
          {/* Menu (Very Small Screen) */}
          <Menu
            id="nav-menu"
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={closeMenu}
            MenuListProps={{
              "aria-labelledby": "nav-menu-button",
            }}
          >
            <MenuItem disabled={isOnContactScreen} onClick={contactClick}>
              <ListItemIcon>
                <EmailIcon fontSize="small" />
              </ListItemIcon>
              Contact
            </MenuItem>
            <MenuItem onClick={githubClick}>
              <ListItemIcon>
                <GitHubIcon fontSize="small" />
              </ListItemIcon>
              GitHub
            </MenuItem>
            {isAdminLoggedIn && (
              <MenuItem onClick={logoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            )}
          </Menu>
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
