import { AUTH_SET_IS_LOGGED_IN } from "constants/actionTypes";

const initialState = {
  isLoggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    default:
      return state;
  }
};

export default auth;
