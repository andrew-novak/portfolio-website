import axios from "axios";

import { API_URL } from "constants/urls";
import indexedObjectFromArray from "helpers/indexedObjectFromArray";
import getUrl from "helpers/getUrl";
import { INTRO_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";
import handleNetworkError from "actions/handleNetworkError";

export const getIntro = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/intro`);

    if (!response.data?.intro) {
      return dispatch(setErrorSnackbar(response.data?.message || "No intro"));
    }

    const {
      text,
      colors: colorsArray,
      imageFilename: serverFilename,
    } = response.data.intro;

    const colors = colorsArray && indexedObjectFromArray(colorsArray);
    const image = serverFilename && {
      serverFilename,
      serverUrl: getUrl.introMediaFile(serverFilename),
    };

    return dispatch({
      type: INTRO_SET,
      text,
      colors,
      image,
    });
  } catch (err) {
    console.error(err);
    if (err.message === 'Network Error') {
      return dispatch(handleNetworkError());
    }
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve the intro"
      )
    );
  }
};
