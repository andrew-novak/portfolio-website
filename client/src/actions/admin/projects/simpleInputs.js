import {
  PROJECT_SET_TITLE,
  PROJECT_SET_DESCRIPTION,
  PROJECT_SET_COLOR,
} from "constants/actionTypes";
import { convertToRaw } from "draft-js";

export const setTitle = (title) => (dispatch) =>
  dispatch({ type: PROJECT_SET_TITLE, title });

export const setDescription = (description) => (dispatch) => {
  console.log(
    "description raw data: ",
    convertToRaw(description.getCurrentContent())
  );
  dispatch({
    type: PROJECT_SET_DESCRIPTION,
    description,
  });
};

export const setColor = (index, color, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_SET_COLOR, index, color });
  closeDialog();
};
