import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";

import { getProjects } from "actions/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";
import ProjectsGrid from "components/ProjectsGrid";

/*
import React, { useEffect, Fragment } from "react";
import {
  Navigate,
  useLocation,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";

import isLoggedIn from "helpers/isLoggedIn";
import Snackbar from "components/Snackbar";
import HomeScreen from "screens/HomeScreen";
import ModifyProductScreen from "screens/ModifyProductScreen";
import StockScreen from "screens/StockScreen";
import OrdersScreen from "screens/OrdersScreen";
import SettingsScreen from "screens/SettingsScreen";
import LoginScreen from "screens/LoginScreen";
import NotFoundScreen from "screens/NotFoundScreen";
import resetState from "actions/resetState";

/*
const PrivateRoute = ({ element, ...rest }) => (
  <Route
    {...rest}
    element={isLoggedIn() ? element : <Navigate to="/login" />}
  />
);
*\/

const AuthOnly = ({ children }) => {
  const isAdminLoggedIn = isLoggedIn();
  if (isAdminLoggedIn) {
    return children;
  }
  return <Navigate to="/login" />;
};

const UnauthOnly = ({ children }) => {
  const isAdminLoggedIn = isLoggedIn();
  if (!isAdminLoggedIn) {
    return children;
  }
  return <Navigate to="/" />;
};

const Routes = ({ snackbar, resetState }) => {
  const location = useLocation();

  useEffect(() => {
    resetState();
  }, [location.pathname]);

  return (
    <Fragment>
      <Snackbar />
      <RouterRoutes>
        <Route
          path="/"
          exact
          element={
            <AuthOnly>
              <HomeScreen />
            </AuthOnly>
          }
        />
        <Route
          path="/create-product"
          exact
          element={
            <AuthOnly>
              <ModifyProductScreen />
            </AuthOnly>
          }
        />
        <Route
          path="/edit-product/:id"
          exact
          element={
            <AuthOnly>
              <ModifyProductScreen />
            </AuthOnly>
          }
        />
        <Route
          path="/stock"
          exact
          element={
            <AuthOnly>
              <StockScreen />
            </AuthOnly>
          }
        />
        <Route
          path="/orders"
          exact
          element={
            <AuthOnly>
              <OrdersScreen />
            </AuthOnly>
          }
        />
        <Route
          path="/settings"
          exact
          element={
            <AuthOnly>
              <SettingsScreen />
            </AuthOnly>
          }
        />
        <Route
          path="/login"
          exact
          element={
            <UnauthOnly>
              <LoginScreen />
            </UnauthOnly>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </RouterRoutes>
    </Fragment>
  );
};

export default connect(null, { resetState })(Routes);
*/

const HomeScreen = ({ projects, getProjects }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  /*
  <Container
    maxWidth="md"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
    }}
  >
  */
  return (
    <Screen>
      <NavBar />
      <Content>
        <div
          style={{
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(3),
          }}
        >
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(3),
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  maxWidth: "calc(100vw - 20px)",
                  width: "100%",
                }}
              >
                <Typography variant="h4">My Projects:</Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/create-project")}
                >
                  Add Project
                </Button>
              </div>
            </div>
            <ProjectsGrid
              projects={projects}
              cardHeightPercentRatio={theme.custom.heightPercentRatios["1:1"]}
            />
          </Container>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

const mapState = (state) => {
  const { projects } = state;
  return { projects };
};

export default connect(mapState, { getProjects })(HomeScreen);
