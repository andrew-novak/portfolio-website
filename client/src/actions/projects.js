import axios from "axios";

import { API_URL } from "constants/urls";
import apiProjectToFrontend from "helpers/apiProjectToFrontend";
import { PROJECTS_SET, PROJECT_SET } from "constants/actionTypes";
import { setErrorSnackbar } from "actions/snackbar";

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    const { projects: receivedProjects } = response.data;
    const projects = receivedProjects.map(apiProjectToFrontend);
    return dispatch({ type: PROJECTS_SET, projects });
  } catch (err) {
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
    const project = apiProjectToFrontend(receivedProject);
    return dispatch({ type: PROJECT_SET, project });
  } catch (err) {
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to retrieve the project"
      )
    );
  }
};
