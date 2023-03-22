import axios from "axios";

import { API_URL } from "constants/urls";
import indexedObjectFromArray from "helpers/indexedObjectFromArray";
import getMedia from "helpers/getMedia";
import { INTRO_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const getIntro = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/intro`);
    const {
      text,
      colors: colorsArray,
      imageFilename: serverFilename,
    } = response.data.intro;

    const colors = colorsArray && indexedObjectFromArray(colorsArray);
    const image = serverFilename && {
      serverFilename,
      serverUrl: getMedia.introFileUrl(serverFilename),
    };

    return dispatch({
      type: INTRO_SET,
      text,
      colors,
      image,
    });
  } catch (err) {
    console.error(err);
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve the intro"
      )
    );
  }
};
