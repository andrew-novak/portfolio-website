import React, { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";

import resetState from "actions/resetState";
import { retrieveIdToken } from "actions/admin/auth";
import HomeScreen from "screens/HomeScreen";
import NoConnectionScreen from "screens/NoConnectionScreen";
import ProjectViewScreen from "screens/ProjectViewScreen";
import ContactScreen from "screens/ContactScreen";
import IntroSettingsScreen from "screens/IntroSettingsScreen";
import ProjectSettingsScreen from "screens/ProjectSettingsScreen";
import AdminLoginScreen from "screens/AdminLoginScreen";
import NotFoundScreen from "screens/NotFoundScreen";

const AuthOnly = ({ isAdminLoggedIn, children }) => {
  if (isAdminLoggedIn) return children;
  return <Navigate to="/admin" />;
};

const UnauthOnly = ({ isAdminLoggedIn, children }) => {
  if (!isAdminLoggedIn) return children;
  return <Navigate to="/" />;
};

const Routes = ({ isNetworkError, isAdminLoggedIn, resetState, retrieveIdToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // on redirect
  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
    // reset redux state
    resetState();
    // set idToken & set redux state based on it
    retrieveIdToken();
  }, [location.pathname, resetState, retrieveIdToken]);

  // on network error
  useEffect(() => {
    if (isNetworkError) {
      navigate("/no-connection");
    }
  }, [isNetworkError, navigate])

  // Router and routes are separated due to this error:
  // Error: useLocation() may be used only in the context of a <Router> component.
  return (
    <RouterRoutes>
      <Route path="/" exact element={<HomeScreen />} />
      <Route path="/no-connection" exact element={<NoConnectionScreen />} />
      <Route path="/project/:projectId" exact element={<ProjectViewScreen />} />
      <Route path="/contact" exact element={<ContactScreen />} />
      <Route
        path="/edit-intro"
        exact
        element={
          <AuthOnly isAdminLoggedIn={isAdminLoggedIn}>
            <IntroSettingsScreen />
          </AuthOnly>
        }
      />
      <Route
        path="/create-project"
        exact
        element={
          <AuthOnly isAdminLoggedIn={isAdminLoggedIn}>
            <ProjectSettingsScreen />
          </AuthOnly>
        }
      />
      <Route
        path="/edit-project/:projectId"
        exact
        element={
          <AuthOnly isAdminLoggedIn={isAdminLoggedIn}>
            <ProjectSettingsScreen />
          </AuthOnly>
        }
      />
      <Route
        path="/admin"
        exact
        element={
          <UnauthOnly isAdminLoggedIn={isAdminLoggedIn}>
            <AdminLoginScreen />
          </UnauthOnly>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </RouterRoutes>
  );
};

const mapState = (state) => {
  const { isNetworkError } = state.general;
  const { isAdminLoggedIn } = state.adminAuth;
  return { isNetworkError, isAdminLoggedIn };
};

export default connect(mapState, { resetState, retrieveIdToken })(Routes);
