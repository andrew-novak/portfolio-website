import { PROJECTS_SET } from "constants/actionTypes";

/*
example:
[
  { id, order, title, description, media },
  { id, order, title, description, media },
  { id, order, title, description, media }
]
note: each project in here only contains one media & one description
*/
const initialState = null;

const projects = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_SET:
      return [...action.projects];

    default:
      return state;
  }
};

export default projects;
