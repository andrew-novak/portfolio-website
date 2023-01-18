import axios from "axios";

import { API_URL } from "constants/urls";
import { SET_PROJECTS, SET_PROJECT } from "constants/actionTypes";

export const getProjects = () => async (dispatch) => {
  const response = await axios.get(`${API_URL}/projects`);
  const { projects } = response.data;
  dispatch({ type: SET_PROJECTS, projects });
};

export const getProject = (projectId) => async (dispatch) => {
  const response = await axios.get(`${API_URL}/projects/${projectId}`);
  const { project } = response.data;
  dispatch({ type: SET_PROJECT, project });
};
