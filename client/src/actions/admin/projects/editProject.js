import axios from "axios";

import splitMediaList from "helpers/splitMediaList";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";

/*
id - number
title - string
description - string
mediaList - array of media objects
*/
const editProject = (id, title, description, mediaList) => async (dispatch) => {
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
  const { serverFilenames, clientBlobs } = splitMediaList(mediaList);
  const mediaDataUrls = await mediaBlobsToDataUrls(clientBlobs);

  const idToken = localStorage.getItem("idToken");
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
};

export default editProject;
