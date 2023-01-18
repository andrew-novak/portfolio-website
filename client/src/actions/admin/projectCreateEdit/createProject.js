import axios from "axios";

import splitMedia from "helpers/splitMedia";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";

/*
title - string
description - string
media - array of objects e.g. [
  { serverFilename: "434576.jpg", clientBlob: null },
  { serverFilename: null, clientBlob: "blob:http://...." },
]
*/
const createProject = (title, description, mediaList) => async (dispatch) => {
  /*
    // client-side input validation:

    if (!productName)
      return dispatch(setErrorSnackbar("Title field cannot be empty."));
    if (!description)
      return dispatch(setErrorSnackbar("Description field cannot be empty."));
    */

  const idToken = localStorage.getItem("idToken");

  const { clientBlobs } = splitMedia(mediaList);
  const mediaDataUrls = await mediaBlobsToDataUrls(clientBlobs);

  const response = await axios.post(
    `${API_URL}/admin/projects`,
    {
      title,
      description,
      mediaDataUrls,
    },
    {
      headers: { Authorization: "Bearer " + idToken },
    }
  );

  /*
  const products = response.data.products.map((product) => ({
    ...product,
    displayedVariantIndex: 0,
  }));
  dispatch({ type: SET_PRODUCTS, products });
  */
};

export default createProject;
