import { PROJECT_SET_SUBMISSION_DIALOG } from "constants/actionTypes";

export const startFields =
  ({ anyButtonFiles }) =>
  (dispatch) =>
    dispatch({
      type: PROJECT_SET_SUBMISSION_DIALOG,
      submissionDialog: {
        isOpen: true,
        projectFieldsProgress: "pending",
        buttonFilesUploadProgress: anyButtonFiles ? "awaiting" : null,
      },
    });

export const endFields = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      projectFieldsProgress: "completed",
    },
  });

export const startButtonFiles = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      buttonFilesUploadProgress: "pending",
    },
  });

export const endButtonFiles = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      buttonFilesUploadProgress: "completed",
    },
  });

export const reset = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: "initial",
  });

export default {
  startFields,
  endFields,
  startButtonFiles,
  endButtonFiles,
  reset,
};
