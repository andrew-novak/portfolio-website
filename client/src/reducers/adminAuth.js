import { ADMIN_AUTH_SET_IS_LOGGED_IN } from "constants/actionTypes";

const initialState = {
  isLoggedIn: false,
};

const adminAuth = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_AUTH_SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    default:
      return state;
  }
};

export default adminAuth;
