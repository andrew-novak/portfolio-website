import { SET_PROJECTS } from "constants/actionTypes";

const initialState = [];

const projects = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return [...action.projects];

    default:
      return state;
  }
};

export default projects;
