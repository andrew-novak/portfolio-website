import { PROJECT_MEDIA_FILE_FORMATS } from "constants/projects";
import { PROJECT_SET_MEDIA_DIALOG } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

/*
const acceptedTypes = {
  staticImage: ["image/jpg", "image/jpeg", "image/png"],
  gifImage: "image/gif",
  video: ["video/mp4"],
};
*/

export const openMediaDialog = (files) => (dispatch) => {
  if (files.length < 1) {
    return dispatch(setErrorSnackbar("No file uploaded"));
  }
  if (files.length > 1) {
    return dispatch(setErrorSnackbar("Multiple files upload not supported"));
  }
  const file = files[0];
  for (let i = 0; i < PROJECT_MEDIA_FILE_FORMATS.length; i++) {
    if (PROJECT_MEDIA_FILE_FORMATS[i].mimeType === file.type) {
      return dispatch({
        type: PROJECT_SET_MEDIA_DIALOG,
        dialogVariant: PROJECT_MEDIA_FILE_FORMATS[i].displayType,
        file,
      });
    }
  }
  dispatch(setErrorSnackbar(`Unsupported file type: ${file.type}`));
};

export const closeMediaDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_MEDIA_DIALOG, dialogVariant: null, file: null });
};
