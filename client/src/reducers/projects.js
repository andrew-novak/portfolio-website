import { PROJECTS_SET } from "constants/actionTypes";

const initialState = [];

const projects = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_SET:
      return [...action.projects];

    default:
      return state;
  }
};

export default projects;
