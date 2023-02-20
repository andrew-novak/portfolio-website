import React, { useEffect } from "react";
import {
  Navigate,
  useLocation,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";

import resetState from "actions/resetState";
import { retrieveIdToken } from "actions/admin/auth";
import HomeScreen from "screens/HomeScreen";
import ViewProjectScreen from "screens/ViewProjectScreen";
import ContactScreen from "screens/ContactScreen";
import ProjectSettingsScreen from "screens/ProjectSettingsScreen";
import AdminLoginScreen from "screens/AdminLoginScreen";
import NotFoundScreen from "screens/NotFoundScreen";

const AuthOnly = ({ isLoggedIn, children }) => {
  if (isLoggedIn) return children;
  return <Navigate to="/admin" />;
};

const UnauthOnly = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return children;
  return <Navigate to="/" />;
};

const Routes = ({ isLoggedIn, resetState, retrieveIdToken }) => {
  const location = useLocation();

  useEffect(() => {
    resetState();
    retrieveIdToken();
  }, [location.pathname]);

  return (
    <RouterRoutes>
      <Route path="/" exact element={<HomeScreen />} />
      <Route path="/project/:projectId" exact element={<ViewProjectScreen />} />
      <Route path="/contact" exact element={<ContactScreen />} />
      <Route
        path="/create-project"
        exact
        element={
          <AuthOnly isLoggedIn={isLoggedIn}>
            <ProjectSettingsScreen />
          </AuthOnly>
        }
      />
      <Route
        path="/edit-project/:projectId"
        exact
        element={
          <AuthOnly isLoggedIn={isLoggedIn}>
            <ProjectSettingsScreen />
          </AuthOnly>
        }
      />
      <Route
        path="/admin"
        exact
        element={
          <UnauthOnly isLoggedIn={isLoggedIn}>
            <AdminLoginScreen />
          </UnauthOnly>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </RouterRoutes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.adminAuth;
  return { isLoggedIn };
};

export default connect(mapState, { resetState, retrieveIdToken })(Routes);
