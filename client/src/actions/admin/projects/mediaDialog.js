import { PROJECT_SET_DIALOG_MEDIA } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const openMediaDialog = (files) => (dispatch) => {
  if (files.length < 1) {
    return dispatch(setErrorSnackbar("No file uploaded"));
  }
  if (files.length > 1) {
    return dispatch(setErrorSnackbar("Multiple files upload not supported"));
  }
  const file = files[0];
  const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (acceptedImageTypes.includes(file.type)) {
    return dispatch({
      type: PROJECT_SET_DIALOG_MEDIA,
      dialogVariant: "image",
      file,
    });
    //return setOpenedMedia({ variant: "image", file });
  }
  const acceptedVideoTypes = ["video/mp4"];
  if (acceptedVideoTypes.includes(file.type)) {
    return dispatch({
      type: PROJECT_SET_DIALOG_MEDIA,
      dialogVariant: "video",
      file,
    });
    //return setOpenedMedia({ variant: "video", file });
  }
  dispatch(setErrorSnackbar(`Unsupported file type: ${file.type}`));
};

export const closeMediaDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_DIALOG_MEDIA, dialogVariant: null, file: null });
};
