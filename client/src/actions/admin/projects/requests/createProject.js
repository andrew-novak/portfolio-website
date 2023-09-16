import axios from "axios";

import buttonsForSubmit from "helpers/buttonsForSubmit";
import submissionDialog from "./submissionDialog";
import indexedObjectToArray from "helpers/indexedObjectToArray";
import descriptionToBackend from "helpers/descriptionToBackend";
import splitMediaList from "helpers/splitMediaList";
import mediaBlobsToDataUrls from "helpers/mediaBlobsToDataUrls";
import { API_URL } from "constants/urls";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";
import handleNetworkError from "actions/handleNetworkError";

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
categoryTags - array of strings
featureTags - array of strings
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
    categoryTags,
    featureTags,
    descriptionList,
    mediaList,
    buttons,
    onSuccessRedirect,
  }) =>
  async (dispatch) => {
    // buttons first, so we can show correct submissionDialog
    const { buttonFields, buttonFilesForm, buttonFilesProgresses } =
      buttonsForSubmit(buttons || []);

    dispatch(submissionDialog.start({ buttonFilesProgresses }));

    // converting project to backend
    const colors = indexedObjectToArray(colorsObj);
    const descriptionListBackend = (descriptionList || []).map(
      descriptionToBackend
    );
    const { clientLocalUrls = [] } = splitMediaList(mediaList || []);
    const mediaDataUrls = await mediaBlobsToDataUrls(clientLocalUrls);

    const idToken = localStorage.getItem("idToken");

    let areFieldsSuccessful = false;

    try {
      // Upload fields
      const response = await axios.post(
        `${API_URL}/admin/projects`,
        {
          colors,
          title,
          categoryTags: categoryTags || [],
          featureTags: featureTags || [],
          descriptionList: descriptionListBackend,
          mediaFilenames: [],
          mediaDataUrls,
          buttons: buttonFields,
        },
        {
          headers: { Authorization: "Bearer " + idToken },
        }
      );
      const { newProjectId } = response.data;
      if (newProjectId == null) {
        console.error("New project ID not received");
        throw new Error();
      }
      dispatch(submissionDialog.completeFields(newProjectId));
      areFieldsSuccessful = true;
      // Upload button files if any
      if (buttonFilesForm) {
        dispatch(submissionDialog.pendFiles());
        await axios.post(
          `${API_URL}/admin/projects/${newProjectId}/button-files`,
          buttonFilesForm,
          {
            headers: {
              Authorization: "Bearer " + idToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      dispatch(submissionDialog.completeFiles());
      dispatch(setSuccessSnackbar("Project created"));
      return onSuccessRedirect();
    } catch (err) {
      console.error(err);
      if (err.message === "Network Error") {
        return dispatch(handleNetworkError());
      }
      if (areFieldsSuccessful) {
        dispatch(submissionDialog.failFiles());
        dispatch(submissionDialog.showButtons());
      } else {
        dispatch(submissionDialog.reset());
      }
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to create the project"
        )
      );
    }
  };

export default createProject;
