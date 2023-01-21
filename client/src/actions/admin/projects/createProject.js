import axios from "axios";

import splitMediaList from "helpers/splitMediaList";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";

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
description - string
media - array of objects e.g. [
  { serverFilename: "434576.jpg", clientBlob: null, ...and some more props },
  { serverFilename: null, clientBlob: "blob:http://....", and some more props },
]
*/
const createProject = (title, description, mediaList) => async (dispatch) => {
  //dispatch(validate(title, description, mediaList));

  const idToken = localStorage.getItem("idToken");

  const { clientBlobs = [] } = splitMediaList(mediaList);
  const mediaDataUrls = await mediaBlobsToDataUrls(clientBlobs);

  const response = await axios.post(
    `${API_URL}/admin/projects`,
    {
      title,
      description,
      mediaDataUrls,
      /*mediaList: mediaList.map(({ serverFilename, clientLocalUrl }) => ({
        serverFilename,
        clientLocalUrl,
      })),*/
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
