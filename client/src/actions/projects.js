import axios from "axios";

import { API_URL, DOWNLOAD_URL } from "constants/urls";
import apiProjectToFrontend from "helpers/apiProjectToFrontend";
import { PROJECTS_SET, PROJECT_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";
import getUrl from "../helpers/getUrl";

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

/*
export const downloadLocalBlobProjectFile =
  (projectId, filename) => async (dispatch) => {
    try {
      const fileUrl = getUrl.projectButtonFile(projectId, filename);
      return window.open(fileUrl);
      /*
      const response = await axios.get(
        `${DOWNLOAD_URL}/projects/project_${projectId}/${filename}`,
        {
          responseType: "blob",
        }
      );
      const file = response.data;
      console.log("filename:", filename);
      console.log("file:", file);

      // -----------------------------------

      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      // -----------------------------------
      *`/
    } catch (err) {
      console.error(err);
      return dispatch(
        setErrorSnackbar(
          err.response?.data?.message || "Unable to retrieve a file"
        )
      );
    }
  };
  */

const addProtocolPrefixIfNone = (passedUrl) => {
  let url = passedUrl;
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
};

const openLocalFile = (file) => {
  // create file link in browser's memory
  const href = URL.createObjectURL(file);

  // create "a" HTML element with href to file & click
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", file.name); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const runProjectButton = (projectId, button) => (dispatch) => {
  // Link
  if (button.behaviour === "redirect") {
    const url = addProtocolPrefixIfNone(button.redirect);
    return (window.location.href = url);
  }
  // Client-Side File
  if (button.behaviour === "file" && button.file) {
    return openLocalFile(button.file);
  }
  // Server-Side File
  if (button.behaviour === "file" && projectId && button.filename) {
    const fileUrl = getUrl.projectButtonFile(projectId, button.filename);
    return window.open(fileUrl);
  }
  // Unable to run
  return dispatch(setErrorSnackbar("Unable to run the button"));
};
