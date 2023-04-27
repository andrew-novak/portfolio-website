import {
  PROJECT_SET_COLOR_DIALOG,
  PROJECT_SET_COLOR,
} from "constants/actionTypes";

export const openColorDialog = (index, passedColor) => (dispatch) => {
  const color = passedColor || "#ffffff";
  dispatch({
    type: PROJECT_SET_COLOR_DIALOG,
    index,
    color,
  });
};

export const closeColorDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_COLOR_DIALOG, name: null, color: null });
};

export const setDialogColor = (color) => (dispatch) => {
  dispatch({ type: PROJECT_SET_COLOR_DIALOG, color });
};

export const setColor = (index, color, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_SET_COLOR, index, color });
  closeDialog();
};
