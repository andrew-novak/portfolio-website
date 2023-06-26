import axios from "axios";

import { API_URL } from "constants/urls";
import apiProjectToFrontend from "helpers/apiProjectToFrontend";
import getVideoCover from "helpers/getVideoCover";
import { PROJECT_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const getProject = (projectId) => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");
  try {
    const response = await axios.get(`${API_URL}/admin/projects/${projectId}`, {
      headers: { Authorization: "Bearer " + idToken },
    });
    const { project: receivedProject, projectPositions: positions } =
      response.data;
    const project = apiProjectToFrontend.full(receivedProject);

    // position related
    const positionIndex = positions.findIndex(
      (obj) => obj.position === project.position
    );

    // create video cover images
    await Promise.all(
      project.mediaList.map(async (media, index) => {
        if (media.displayType === "video") {
          const coverBlob = await getVideoCover(media.serverUrl);
          const coverUrl = URL.createObjectURL(coverBlob) || null;
          project.mediaList[index].coverUrl = coverUrl;
        }
      })
    );

    return dispatch({
      type: PROJECT_SET,
      project: { ...project, positions, positionIndex },
    });
  } catch (err) {
    console.error(err);
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve the project"
      )
    );
  }
};

export default getProject;
