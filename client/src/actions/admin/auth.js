import axios from "axios";

import { AUTH_SET_IS_LOGGED_IN } from "constants/actionTypes";
import { API_URL } from "constants/urls";

export const retrieveIdToken = () => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");
  if (idToken) {
    return dispatch({ type: AUTH_SET_IS_LOGGED_IN, isLoggedIn: true });
  }
  dispatch({ type: AUTH_SET_IS_LOGGED_IN, isLoggedIn: false });
};

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
        dispatch({ type: AUTH_SET_IS_LOGGED_IN, isLoggedIn: true });
        return redirect();
      }
      new Error("No id token");
    } catch (err) {
      console.log("error:", err);
      alert("Something went wrong!");
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("idToken");
  dispatch({ type: AUTH_SET_IS_LOGGED_IN, isLoggedIn: false });
};
