import axios from "axios";

import getMedia from "helpers/getMedia";
import supportedMimeTypes from "constants/supportedMimeTypes";
import { API_URL } from "constants/urls";
import { PROJECTS_SET, PROJECT_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

const convertProject = (project) => {
  const { id, mediaFilenames } = project;
  // Converting server-side media filenames to client-side media objects containing more info
  const mediaList = mediaFilenames.map((filename) => {
    const serverUrl = getMedia.oneProjectFileUrl(id, filename);
    const extension = filename ? filename.split(".").pop() : null;
    const supportedType = supportedMimeTypes.find(
      (obj) => obj.extension === extension
    );
    const mimeType = supportedType ? supportedType.mimeType : null;
    const displayType = supportedType ? supportedType.displayType : null;
    return {
      serverFilename: filename,
      serverUrl,
      mimeType,
      displayType,
    };
  });
  return { ...project, mediaFilenames: null, mediaList };
};

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    const { projects: receivedProjects } = response.data;
    const projects = receivedProjects.map(convertProject);
    return dispatch({ type: PROJECTS_SET, projects });
  } catch (err) {
    return dispatch(
      setErrorSnackbar(
        err.response.data.message || "Unable to retrieve projects"
      )
    );
  }
};

export const getProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    const { project: receivedProject } = response.data;
    const project = convertProject(receivedProject);
    return dispatch({ type: PROJECT_SET, project });
  } catch (err) {
    return dispatch(
      setErrorSnackbar(
        err.response.data.message || "Unable to retrieve the project"
      )
    );
  }
};
