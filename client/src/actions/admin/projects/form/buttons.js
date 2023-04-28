import {
  PROJECT_SET_BUTTON_DIALOG,
  PROJECT_SET_BUTTON_DIALOG_BUTTON,
  PROJECT_SET_BUTTON,
} from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

// FOR BUTTON DIALOG

export const openButtonDialog =
  (index, button = "initial") =>
  (dispatch) => {
    dispatch({
      type: PROJECT_SET_BUTTON_DIALOG,
      buttonDialog: { index, button },
    });
  };

export const closeButtonDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_BUTTON_DIALOG, buttonDialog: "initial" });
};

export const setDialogButton = (button) => (dispatch) => {
  // File-Related
  // Upload files through 'uploadFiles' instead of 'file'
  // 'file' property is an already accepted file or null
  let file = null;
  const { uploadFiles } = button;
  if (uploadFiles) {
    if (uploadFiles.length < 1) {
      return dispatch(setErrorSnackbar("No file uploaded"));
    }
    if (uploadFiles.length > 1) {
      return dispatch(setErrorSnackbar("Multiple files upload not supported"));
    }
    file = uploadFiles[0];
    delete button.uploadFiles;
  }

  dispatch({
    type: PROJECT_SET_BUTTON_DIALOG_BUTTON,
    button: { ...button, file },
  });
};

// FOR PROJECT SETTINGS

export const setButton = (index, button, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_SET_BUTTON, index, button });
  closeDialog && closeDialog();
};
