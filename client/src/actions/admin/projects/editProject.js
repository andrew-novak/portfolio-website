import axios from "axios";

import splitMediaList from "helpers/splitMediaList";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

/*
id - number
title - string
description - string
mediaList - array of media objects
*/
const editProject =
  (id, title, description, mediaList, onSuccessRedirect) =>
  async (dispatch) => {
    /*
  // client-side input validation:
  if (!productName)
    return dispatch(setErrorSnackbar("Title field cannot be empty."));
  if (!description)
    return dispatch(setErrorSnackbar("Description field cannot be empty."));
  */

    // mediaFilenames, mediaDataUrls
    // mediaFilenames - array of filenames (strings) (already saved in server)
    // mediaDataUrls - array of dataUrls (strings) (new files)
    const { serverFilenames = [], clientLocalUrls = [] } =
      splitMediaList(mediaList);
    const mediaDataUrls = await mediaBlobsToDataUrls(clientLocalUrls);

    const idToken = localStorage.getItem("idToken");

    try {
      const response = await axios.post(
        `${API_URL}/admin/projects/${id}`,
        {
          title,
          description,
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
          err.response.data.message || "Unable to edit the project"
        )
      );
    }
  };

export default editProject;
