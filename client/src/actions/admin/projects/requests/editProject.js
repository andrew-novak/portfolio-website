import axios from "axios";

import buttonsToBackend from "helpers/buttonsToBackend";
import submissionDialog from "./submissionDialog";
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
  ({
    id: projectId,
    position,
    colors: colorsObj,
    title,
    descriptionList,
    mediaList,
    buttons,
    onSuccessRedirect,
  }) =>
  async (dispatch) => {
    // buttons first, so we can show correct submissionDialog
    const { buttonFields, buttonFilesForm } = buttonsToBackend(buttons || []);

    dispatch(
      submissionDialog.startFields({ anyButtonFiles: !!buttonFilesForm })
    );

    // convert project to backend
    const colors = indexedObjectToArray(colorsObj);
    const descriptionListBackend = descriptionList.map(descriptionToBackend);
    const { serverFilenames = [], clientLocalUrls = [] } =
      splitMediaList(mediaList);
    const mediaDataUrls = await mediaBlobsToDataUrls(clientLocalUrls);

    const idToken = localStorage.getItem("idToken");

    console.log("buttons:", buttons);
    try {
      // Upload fields
      await axios.post(
        `${API_URL}/admin/projects/${projectId}`,
        {
          position,
          colors,
          title,
          descriptionList: descriptionListBackend,
          mediaFilenames: serverFilenames,
          mediaDataUrls,
          buttons: buttonFields,
        },
        {
          headers: { Authorization: "Bearer " + idToken },
        }
      );
      dispatch(submissionDialog.endFields());
      // Upload button files if any
      if (buttonFilesForm) {
        dispatch(submissionDialog.startButtonFiles());
        await axios.post(
          `${API_URL}/admin/projects/${projectId}/button-files`,
          buttonFilesForm,
          {
            headers: {
              Authorization: "Bearer " + idToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      dispatch(submissionDialog.endButtonFiles());
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
