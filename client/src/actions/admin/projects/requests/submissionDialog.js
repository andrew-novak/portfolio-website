import { PROJECT_SET_SUBMISSION_DIALOG } from "constants/actionTypes";

export const start =
  ({ projectId, buttonFilesProgresses }) =>
  (dispatch) =>
    dispatch({
      type: PROJECT_SET_SUBMISSION_DIALOG,
      submissionDialog: {
        isOpen: true,
        ...(projectId ? { projectId } : {}),
        projectFieldsProgress: "pending",
        overallButtonFilesProgress: Object.keys(buttonFilesProgresses).length > 0 ? "awaiting" : null,
        buttonFilesProgresses,
      },
    });

export const completeFields = (projectId) => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      ...(projectId ? { projectId } : {}),
      projectFieldsProgress: "completed",
    },
  });

export const pendFiles = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      overallButtonFilesProgress: "pending",
    },
  });

export const completeFiles = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      overallButtonFilesProgress: "completed",
    },
  });

export const failFiles = () => dispatch =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      overallButtonFilesProgress: "failed",
    },
  });

export const showButtons = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: {
      isShowingButtons: true,
    },
  });

export const reset = () => (dispatch) =>
  dispatch({
    type: PROJECT_SET_SUBMISSION_DIALOG,
    submissionDialog: "initial",
  });

export default {
  start,
  completeFields,
  pendFiles,
  completeFiles,
  failFiles,
  showButtons,
  reset,
};
