import {
  PROJECT_SET_TITLE,
  PROJECT_SET_DESCRIPTION,
} from "constants/actionTypes";

export const setTitle = (title) => (dispatch) =>
  dispatch({ type: PROJECT_SET_TITLE, title });

export const setDescription = (description) => (dispatch) =>
  dispatch({
    type: PROJECT_SET_DESCRIPTION,
    description,
  });
