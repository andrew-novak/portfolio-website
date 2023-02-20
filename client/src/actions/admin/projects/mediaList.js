import {
  PROJECT_MEDIA_LIST_ADD,
  PROJECT_MEDIA_LIST_ADD_VIDEO,
  PROJECT_MEDIA_LIST_SET,
  PROJECT_MEDIA_LIST_REMOVE,
} from "constants/actionTypes";
//import { unselectAll } from "actions/selection";
import getVideoCover from "helpers/getVideoCover";

export const mediaListAdd =
  ({ localUrl, mimeType, displayType, closeMediaDialog }) =>
  (dispatch) => {
    console.log("ELO", localUrl, mimeType, displayType);
    dispatch({
      type: PROJECT_MEDIA_LIST_ADD,
      localUrl,
      mimeType,
      displayType,
      closeMediaDialog,
    });
    closeMediaDialog();
    //dispatch(unselectAll());
  };

export const mediaListAddVideo =
  ({ videoFile, videoUrl, mimeType, displayType, closeMediaDialog }) =>
  async (dispatch) => {
    const coverFile = await getVideoCover(videoFile);
    const coverUrl = URL.createObjectURL(coverFile);
    dispatch({
      type: PROJECT_MEDIA_LIST_ADD_VIDEO,
      videoUrl,
      coverUrl,
      mimeType,
      displayType,
    });
    closeMediaDialog();
  };

const swap = (array, moveIndex, toIndex) => {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;
  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
};

export const mediaListSwapPlaces =
  ({ mediaList, sourceIndex, targetIndex }) =>
  (dispatch) => {
    if (sourceIndex === targetIndex) return;
    const newMediaList = swap(mediaList, sourceIndex, targetIndex);
    return dispatch({
      type: PROJECT_MEDIA_LIST_SET,
      newMediaList,
    });
  };

export const mediaListRemove = (mediaIndexes, closeDialog) => (dispatch) => {
  dispatch({ type: PROJECT_MEDIA_LIST_REMOVE, mediaIndexes });
  closeDialog();
  //dispatch(unselectAll());
};
