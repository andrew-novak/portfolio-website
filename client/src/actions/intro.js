import axios from "axios";

import { API_URL } from "constants/urls";
import getMedia from "helpers/getMedia";
import { INTRO_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const getIntro = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/intro`);
    const { imageFilename: serverFilename, text } = response.data.intro;
    const image = serverFilename && {
      serverFilename,
      serverUrl: getMedia.introFileUrl(serverFilename),
    };
    return dispatch({
      type: INTRO_SET,
      image,
      text,
    });
  } catch (err) {
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve the intro"
      )
    );
  }
};