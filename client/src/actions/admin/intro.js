import axios from "axios";

import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";
import {
  INTRO_SET_DIALOG_IMAGE,
  INTRO_SET_IMAGE,
  INTRO_SET_TEXT,
} from "constants/actionTypes";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

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

export const setImage = (clientLocalUrl, closeDialog) => (dispatch) => {
  dispatch({ type: INTRO_SET_IMAGE, image: { clientLocalUrl } });
  closeDialog();
};

export const setText = (text) => (dispatch) => {
  dispatch({ type: INTRO_SET_TEXT, text });
};

export const editIntro =
  (image, text, onSuccessRedirect) => async (dispatch) => {
    const idToken = localStorage.getItem("idToken");

    const [imageDataUrl] = await mediaBlobsToDataUrls([image.clientLocalUrl]);

    try {
      const response = await axios.post(
        `${API_URL}/admin/intro`,
        {
          ...(imageDataUrl && { imageDataUrl }),
          ...(text && { text }),
        },
        {
          headers: { Authorization: "Bearer " + idToken },
        }
      );
      dispatch(setSuccessSnackbar("Intro edited"));
      onSuccessRedirect();
    } catch (err) {
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to edit the intro"
        )
      );
    }
  };
