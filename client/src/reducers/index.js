import { combineReducers } from "redux";

import snackbar from "./snackbar";
import adminAuth from "./adminAuth";
import projects from "./projects";
import intro from "./intro";
import project from "./project";
import { RESET_STATE } from "constants/actionTypes";

const appReducer = combineReducers({
  snackbar,
  adminAuth,
  projects,
  intro,
  project,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    // Reset all state except snackbar
    state = {
      snackbar: state.snackbar,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
