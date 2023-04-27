import {
  PROJECT_SET_BUTTON_DIALOG,
  PROJECT_SET_BUTTON_DIALOG_BUTTON,
  PROJECT_SET_BUTTON,
} from "constants/actionTypes";

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
  dispatch({ type: PROJECT_SET_BUTTON_DIALOG_BUTTON, button });
};

export const setButton = (index, button, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_SET_BUTTON, button });
  closeDialog && closeDialog();
};
