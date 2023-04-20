import { convertToRaw } from "draft-js";
import axios from "axios";

import indexedObjectToArray from "helpers/indexedObjectToArray";
import splitMediaList from "helpers/splitMediaList";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

/*
const validate = (title, description, mediaList) => (dispatch) => {
  // client-side input validation:
  if (!title) return dispatch(setErrorSnackbar("Title field cannot be empty."));
  if (!description)
    return dispatch(setErrorSnackbar("Description field cannot be empty."));
};
*/

/*
title - string
description - DraftJS EditorState
media - array of objects e.g. [
  { serverFilename: "434576.jpg", clientBlob: null, ...and some more props },
  { serverFilename: null, clientBlob: "blob:http://....", and some more props },
]
*/
const createProject =
  (title, description, colorsObj, mediaList, onSuccessRedirect) =>
  async (dispatch) => {
    // DraftJS EditorState to Raw JS Object
    const contentState = description.getCurrentContent();
    const rawDescription = convertToRaw(contentState);

    const colors = indexedObjectToArray(colorsObj);

    const { clientLocalUrls = [] } = splitMediaList(mediaList);
    const mediaDataUrls = await mediaBlobsToDataUrls(clientLocalUrls);

    const idToken = localStorage.getItem("idToken");

    try {
      const response = await axios.post(
        `${API_URL}/admin/projects`,
        {
          title,
          description: rawDescription,
          colors,
          mediaFilenames: [],
          mediaDataUrls,
        },
        {
          headers: { Authorization: "Bearer " + idToken },
        }
      );
      dispatch(setSuccessSnackbar("Project created"));
      return onSuccessRedirect();
    } catch (err) {
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to create the project"
        )
      );
    }
  };

export default createProject;
