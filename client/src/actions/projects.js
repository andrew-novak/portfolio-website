import axios from "axios";

import { API_URL, MEDIA_URL } from "constants/urls";
import apiProjectToFrontend from "helpers/apiProjectToFrontend";
import { PROJECTS_SET, PROJECT_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    const { projects: receivedProjects } = response.data;
    const projects = receivedProjects.map(apiProjectToFrontend.simplified);
    return dispatch({ type: PROJECTS_SET, projects });
  } catch (err) {
    console.error(err);
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve projects"
      )
    );
  }
};

export const getProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    const { project: receivedProject } = response.data;
    const project = apiProjectToFrontend.full(receivedProject);
    return dispatch({ type: PROJECT_SET, project });
  } catch (err) {
    console.error(err);
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve the project"
      )
    );
  }
};

export const downloadProjectFile =
  (projectId, filename) => async (dispatch) => {
    try {
      const response = await axios.get(`${MEDIA_URL}/projects/${projectId}`);
      const { file } = response.data;
      //const projects = receivedProjects.map(apiProjectToFrontend);
      return; //dispatch({ type: PROJECTS_SET, projects });
    } catch (err) {
      console.error(err);
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to retrieve a file"
        )
      );
    }
  };

const addProtocolIfNone = (passedUrl) => {
  let url = passedUrl;
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
};

export const runButton = (projectId, button) => (dispatch) => {
  // Link
  if (button.behaviour === "redirect") {
    return (window.location.href = addProtocolIfNone(button.redirect));
  }
  // Server-Side File
  if (button.behaviour === "file" && button.file === "string") {
    return downloadProjectFile(projectId, button.file);
  }
  // Client-Side File
  if (button.behaviour === "file") {
    return alert("TODO: Download a local file");
  }
  return;
};
