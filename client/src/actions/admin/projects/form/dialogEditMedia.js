import { PROJECT_SET_EDIT_MEDIA_DIALOG } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const openMediaEditDialog =
  (mediaList, imageUrls, index) => (dispatch) => {
    return dispatch({
      type: PROJECT_SET_EDIT_MEDIA_DIALOG,
      mediaEditDialog: {
        index,
        displayType: mediaList[index].displayType,
        url: mediaList[index].clientLocalUrl || mediaList[index].serverUrl,
      },
    });
  };

export const closeMediaEditDialog = () => (dispatch) => {
  dispatch({ type: PROJECT_SET_EDIT_MEDIA_DIALOG, mediaEditDialog: null });
};
