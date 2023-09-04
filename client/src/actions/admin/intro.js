import axios from "axios";

import indexedObjectToArray from "helpers/indexedObjectToArray";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";
import {
  INTRO_SET_DIALOG_COLOR,
  INTRO_SET_DIALOG_IMAGE,
  INTRO_SET_COLOR,
  INTRO_SET_IMAGE,
  INTRO_SET_TEXT,
} from "constants/actionTypes";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";
import handleNetworkError from "actions/handleNetworkError";

export const openColorDialog = (index, passedColor) => (dispatch) => {
  const color = passedColor || "rgb(255, 255, 255)";
  dispatch({
    type: INTRO_SET_DIALOG_COLOR,
    index,
    color,
  });
};

export const setDialogColor = (color) => (dispatch) => {
  dispatch({
    type: INTRO_SET_DIALOG_COLOR,
    color,
  });
};

export const closeColorDialog = () => (dispatch) => {
  dispatch({ type: INTRO_SET_DIALOG_COLOR, index: null, color: null });
};

export const openImageDialog = (files) => (dispatch) => {
  if (files.length < 1) {
    return dispatch(setErrorSnackbar("No file uploaded"));
  }
  if (files.length > 1) {
    return dispatch(setErrorSnackbar("Multiple files upload not supported"));
  }
  const file = files[0];
  const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (acceptedImageTypes.includes(file.type)) {
    const localUrl = URL.createObjectURL(file);
    return dispatch({
      type: INTRO_SET_DIALOG_IMAGE,
      dialogImage: localUrl,
    });
  }
  return dispatch(setErrorSnackbar(`Unsupported file type: ${file.type}`));
};

export const closeImageDialog = () => (dispatch) => {
  dispatch({ type: INTRO_SET_DIALOG_IMAGE, dialogImage: null });
};

export const setColor = (index, color, closeDialog) => (dispatch) => {
  dispatch({ type: INTRO_SET_COLOR, index, color });
  closeDialog();
};

export const setImage = (clientLocalUrl, closeDialog) => (dispatch) => {
  dispatch({ type: INTRO_SET_IMAGE, image: { clientLocalUrl } });
  closeDialog();
};

export const removeImage = () => (dispatch) =>
  dispatch({ type: INTRO_SET_IMAGE, image: "default" });

export const setText = (text) => (dispatch) => {
  dispatch({ type: INTRO_SET_TEXT, text });
};

export const setIntro =
  (text, colorsObj, image, onSuccessRedirect) => async (dispatch) => {
    const colors = indexedObjectToArray(colorsObj);

    const [imageDataUrl] = await mediaBlobsToDataUrls([
      image.clientLocalUrl || null,
    ]);

    const idToken = localStorage.getItem("idToken");

    try {
      await axios.post(
        `${API_URL}/admin/intro`,
        {
          text,
          colors,
          ...(imageDataUrl && { imageDataUrl }),
          ...(image.serverFilename && { imageFilename: image.serverFilename }),
        },
        {
          headers: { Authorization: "Bearer " + idToken },
        }
      );
      dispatch(setSuccessSnackbar("Intro edited"));
      onSuccessRedirect();
    } catch (err) {
      console.error(err);
      if (err.message === 'Network Error') {
        return dispatch(handleNetworkError());
      }
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to edit the intro"
        )
      );
    }
  };
