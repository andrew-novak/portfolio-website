import { PROJECT_SET_MEDIA_DIALOG } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

// accepted types:
const acceptedTypes = {
  staticImage: ["image/jpg", "image/jpeg", "image/png"],
  gifImage: "image/gif",
  video: ["video/mp4"],
};

export const openMediaDialog = (files) => (dispatch) => {
  if (files.length < 1) {
    return dispatch(setErrorSnackbar("No file uploaded"));
  }
  if (files.length > 1) {
    return dispatch(setErrorSnackbar("Multiple files upload not supported"));
  }
  const file = files[0];
  if (acceptedTypes.staticImage.includes(file.type)) {
    return dispatch({
      type: PROJECT_SET_MEDIA_DIALOG,
      dialogVariant: "image",
      file,
    });
  }
  if (file.type === acceptedTypes.gifImage) {
    return dispatch({
      type: PROJECT_SET_MEDIA_DIALOG,
      dialogVariant: "gif",
      file,
    });
  }
  if (acceptedTypes.video.includes(file.type)) {
    return dispatch({
      type: PROJECT_SET_MEDIA_DIALOG,
      dialogVariant: "video",
      file,
    });
  }
  dispatch(setErrorSnackbar(`Unsupported file type: ${file.type}`));
};

export const closeMediaDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_MEDIA_DIALOG, dialogVariant: null, file: null });
};
