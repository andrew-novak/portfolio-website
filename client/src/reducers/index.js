import { combineReducers } from "redux";

import snackbar from "./snackbar";
import projects from "./projects";
import project from "./project";
import auth from "./auth";
import projectCreateEdit from "./projectCreateEdit";
import { RESET_STATE } from "constants/actionTypes";

const appReducer = combineReducers({
  snackbar,
  projects,
  project,
  auth,
  projectCreateEdit,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
