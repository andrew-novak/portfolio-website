import axios from "axios";

import { setErrorSnackbar } from "actions/snackbar";
import { ADMIN_API_URL } from "constants/urls";

const mediaSrcToDataUrl = (blobUrl) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = function (ev) {
        reject(
          `Exception reading Blob > xhr.response: ${xhr.response}\nLast Progress Event: ${ev}`
        );
      };
    };
    xhr.onerror = function (ev) {
      reject(
        `Exception fetching Blob > BlobUrl: ${blobUrl}\nLast Progress Event: ${ev}`
      );
    };

    xhr.open("GET", blobUrl);
    xhr.send();
  });
};

const formatVisualVariants = async (srcVisualVariants) => {
  /*
  await Promise.all(
    srcVisualVariants.map(async (variant) => ({
      ...variant,
      media,
    }))
  );

  const variants = await Promise.all(
    passedVariants.map(async (variant) => ({
      ...variant,
      media: await Promise.all(
        variant.media.map(async (oneMedia) =>
          Boolean(oneMedia.src)
            ? {
                ...oneMedia,
                //
                srcDataUrl: await mediaSrcToDataUrl(oneMedia.src),
                src: null,
              }
            : oneMedia
        )
      ),
    }))
  );
  */
  console.log("Src Visual Variants:", srcVisualVariants);
  const dataUrlVisualVariants = await Promise.all(
    srcVisualVariants.map(async (variant) => ({
      ...variant,
      media: await Promise.all(
        variant.media.map(async (oneMedia) =>
          Boolean(oneMedia.src)
            ? {
                ...oneMedia,
                srcDataUrl: await mediaSrcToDataUrl(oneMedia.src),
                src: null,
              }
            : oneMedia
        )
      ),
    }))
  );
  console.log("Data Url Visual Variants:", dataUrlVisualVariants);
  return dataUrlVisualVariants;
};

const saveChanges =
  ({
    productId = "new",
    productName,
    discountedPrice: discountedPriceString,
    currentPrice: currentPriceString,
    description,
    types,
  }) =>
  async (dispatch) => {
    if (!productName)
      return dispatch(setErrorSnackbar("Product name field cannot be empty."));
    if (!currentPriceString)
      return dispatch(setErrorSnackbar("Current price cannot be empty"));
    if (!description)
      return dispatch(setErrorSnackbar("Description field cannot be empty."));

    const srcVisualVariants = types[0].variants;
    const customTypes = types.slice(1);

    if (srcVisualVariants.length < 1)
      return dispatch(
        setErrorSnackbar(
          "The product must include at least 1 variant of the default visual type."
        )
      );

    const discountedPrice = Number(discountedPriceString) * 100;
    const currentPrice = Number(currentPriceString) * 100;

    const dataUrlVisualVariants = await formatVisualVariants(srcVisualVariants);

    console.log("dataUrlVisualVariants:", dataUrlVisualVariants);

    const idToken = localStorage.getItem("idToken");

    return axios.post(
      `${ADMIN_API_URL}/products/${productId}`,
      {
        productName,
        discountedPrice,
        currentPrice,
        description,
        visualVariants: dataUrlVisualVariants,
        customTypes,
      },
      { headers: { Authorization: "Bearer " + idToken } }
    );
  };

export default saveChanges;
