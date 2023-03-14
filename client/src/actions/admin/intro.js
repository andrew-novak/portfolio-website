import axios from "axios";

import { API_URL } from "constants/urls";
import { INTRO_SET_IMAGE, INTRO_SET_TEXT } from "constants/actionTypes";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

export const setImage = (image) => (dispatch) => {
  dispatch({ type: INTRO_SET_IMAGE, image });
};

export const setText = (text) => (dispatch) => {
  dispatch({ type: INTRO_SET_TEXT, text });
};

export const editIntro =
  (image, text, onSuccessRedirect) => async (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    const response = await axios.post(
      `${API_URL}/admin/intro`,
      {
        image,
        text,
      },
      {
        headers: { Authorization: "Bearer " + idToken },
      }
    );

    if (response.status !== 200) {
      return dispatch(setErrorSnackbar("Intro edit failed"));
    }

    dispatch(setSuccessSnackbar("Intro edited"));
    onSuccessRedirect();
  };
