import axios from "axios";

import { API_URL } from "constants/urls";

/*
title - string
description - string
mediaFilenames - array of filenames (strings) (already saved in server)
mediaDataUrls - array of dataUrls (strings) (new files)
*/
const addProject =
  (id, title, description, mediaFilenames, mediaDataUrls) =>
  async (dispatch) => {
    /*
  // client-side input validation:

  if (!productName)
    return dispatch(setErrorSnackbar("Title field cannot be empty."));
  if (!description)
    return dispatch(setErrorSnackbar("Description field cannot be empty."));
  */

    const idToken = localStorage.getItem("idToken");
    const response = await axios.post(
      `${API_URL}/admin/projects/${id}`,
      {
        title,
        description,
        mediaFilenames,
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

export default addProject;
