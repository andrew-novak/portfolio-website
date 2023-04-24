import axios from "axios";

import indexedObjectToArray from "helpers/indexedObjectToArray";
import descriptionToBackend from "helpers/descriptionToBackend";
import splitMediaList from "helpers/splitMediaList";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

/*
id - number
position - number
colorsObj - indexed object of color strings
title - string
descriptionList - array of DraftJS EditorStates
mediaList - array of media objects e.g. [
  { serverFilename: "434576.jpg", clientBlob: null, ...and some more props },
  { serverFilename: null, clientBlob: "blob:http://....", and some more props },
]
*/
const editProject =
  (
    id,
    position,
    colorsObj,
    title,
    descriptionList,
    mediaList,
    onSuccessRedirect
  ) =>
  async (dispatch) => {
    // convert project to backend
    const colors = indexedObjectToArray(colorsObj);
    const descriptionListBackend = descriptionList.map(descriptionToBackend);
    const { serverFilenames = [], clientLocalUrls = [] } =
      splitMediaList(mediaList);
    const mediaDataUrls = await mediaBlobsToDataUrls(clientLocalUrls);

    const idToken = localStorage.getItem("idToken");

    console.log(descriptionListBackend);
    try {
      await axios.post(
        `${API_URL}/admin/projects/${id}`,
        {
          position,
          colors,
          title,
          descriptionList: descriptionListBackend,
          mediaFilenames: serverFilenames,
          mediaDataUrls,
        },
        {
          headers: { Authorization: "Bearer " + idToken },
        }
      );
      dispatch(setSuccessSnackbar("Project edited"));
      return onSuccessRedirect();
    } catch (err) {
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to edit the project"
        )
      );
    }
  };

export default editProject;
