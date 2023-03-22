import {
  PROJECT_SET_TITLE,
  PROJECT_SET_DESCRIPTION,
  PROJECT_SET_COLOR,
} from "constants/actionTypes";

export const setTitle = (title) => (dispatch) =>
  dispatch({ type: PROJECT_SET_TITLE, title });

export const setDescription = (description) => (dispatch) =>
  dispatch({
    type: PROJECT_SET_DESCRIPTION,
    description,
  });

export const setColor = (index, color, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_SET_COLOR, index, color });
  closeDialog();
};
