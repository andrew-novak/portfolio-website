import { EditorState, ContentState } from "draft-js";

import {
  PROJECT_SET_COLOR,
  PROJECT_SET_TITLE,
  PROJECT_SET_DESCRIPTION_LIST,
  PROJECT_SET_DESCRIPTION_ELEMENT,
  PROJECT_SELECT_DESCRIPTION,
} from "constants/actionTypes";

export const setColor = (index, color, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_SET_COLOR, index, color });
  closeDialog();
};

export const setTitle = (title) => (dispatch) =>
  dispatch({ type: PROJECT_SET_TITLE, title });

// 'description' prop - DraftJS EditorState
export const setDescription = (index, description) => (dispatch) =>
  dispatch({
    type: PROJECT_SET_DESCRIPTION_ELEMENT,
    index,
    description,
  });

// TODO: remove whitespace-only descriptions from descriptionList
// on project submit (+ maybe on description change)
export const selectDescription =
  (newIndex, oldIndex, descriptionList) => (dispatch) => {
    if (newIndex === oldIndex) return;

    const updateDescriptions = [];
    if (!(descriptionList[newIndex] instanceof EditorState)) {
      updateDescriptions[newIndex] = EditorState.createEmpty();
    }

    dispatch({
      type: PROJECT_SELECT_DESCRIPTION,
      index: newIndex,
      updateDescriptions,
    });
  };

export const clearDescriptionList = (descriptionList) => (dispatch) => {
  const newList = descriptionList.map((description, index) => {
    if (description?.getCurrentContent()?.hasText()) {
      return EditorState.push(description, ContentState.createFromText(""));
    }
    return description;
  });
  dispatch({
    type: PROJECT_SET_DESCRIPTION_LIST,
    descriptionList: newList,
  });
};
