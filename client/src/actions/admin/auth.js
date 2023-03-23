import axios from "axios";

import { ADMIN_AUTH_SET_IS_LOGGED_IN } from "constants/actionTypes";
import { API_URL } from "constants/urls";
import { setErrorSnackbar } from "actions/snackbar";

export const login =
  ({ email, password, redirect }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        email,
        password,
      });
      if (response.data.idToken) {
        const idToken = response.data.idToken;
        localStorage.setItem("idToken", idToken);
        dispatch({ type: ADMIN_AUTH_SET_IS_LOGGED_IN, isAdminLoggedIn: true });
        return redirect();
      }
      new Error("No id token");
    } catch (err) {
      console.error(err);
      return dispatch(
        setErrorSnackbar(err.response?.data?.message || "Unable to login")
      );
    }
  };

export const retrieveIdToken = () => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");

  // if no idToken in localStorage
  if (!idToken) {
    return dispatch({
      type: ADMIN_AUTH_SET_IS_LOGGED_IN,
      isAdminLoggedIn: false,
    });
  }

  // do it here so elements do not disappear
  // and reappear on a redirect/refresh
  dispatch({
    type: ADMIN_AUTH_SET_IS_LOGGED_IN,
    isAdminLoggedIn: true,
  });

  // if idToken in localStorage
  try {
    const response = await axios.post(
      `${API_URL}/admin/checkIdToken`,
      {},
      {
        headers: { Authorization: "Bearer " + idToken },
      }
    );
    // redux state has been already set above so just return
    return;
  } catch (err) {
    console.error(err);
    dispatch(
      setErrorSnackbar(err.response?.data?.message || "ID token check failed")
    );
    localStorage.removeItem("idToken");
    return dispatch({
      type: ADMIN_AUTH_SET_IS_LOGGED_IN,
      isAdminLoggedIn: false,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("idToken");
  dispatch({ type: ADMIN_AUTH_SET_IS_LOGGED_IN, isAdminLoggedIn: false });
};
