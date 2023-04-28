import axios from "axios";

import indexedObjectToArray from "helpers/indexedObjectToArray";
import descriptionToBackend from "helpers/descriptionToBackend";
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
colorsObj - indexed object of color strings
title - string
descriptionList - array of DraftJS EditorStates
mediaList - array of media objects e.g. [
  { serverFilename: "434576.jpg", clientBlob: null, ...and some more props },
  { serverFilename: null, clientBlob: "blob:http://....", and some more props },
]
*/
const createProject =
  ({
    colors: colorsObj,
    title,
    descriptionList,
    mediaList,
    buttons,
    onSuccessRedirect,
  }) =>
  async (dispatch) => {
    // converting project to backend
    const colors = indexedObjectToArray(colorsObj);
    const descriptionListBackend = descriptionList.map(descriptionToBackend);
    const { clientLocalUrls = [] } = splitMediaList(mediaList || []);
    const mediaDataUrls = await mediaBlobsToDataUrls(clientLocalUrls);

    const idToken = localStorage.getItem("idToken");

    try {
      await axios.post(
        `${API_URL}/admin/projects`,
        {
          colors,
          title,
          descriptionList: descriptionListBackend,
          mediaFilenames: [],
          mediaDataUrls,
          buttons,
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
