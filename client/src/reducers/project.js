import { SET_PROJECT } from "constants/actionTypes";

const initialState = {};

const project = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;

    default:
      return state;
  }
};

export default project;
