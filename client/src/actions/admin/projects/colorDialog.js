import { PROJECT_SET_DIALOG_COLOR } from "constants/actionTypes";

export const openColorDialog = (index, passedColor) => (dispatch) => {
  const color = passedColor || "#ffffff";
  dispatch({
    type: PROJECT_SET_DIALOG_COLOR,
    index,
    color,
  });
};

export const setDialogColor = (color) => (dispatch) => {
  dispatch({ type: PROJECT_SET_DIALOG_COLOR, color });
};

export const closeColorDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_DIALOG_COLOR, name: null, color: null });
};
