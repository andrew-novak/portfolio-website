import { ADMIN_AUTH_SET_IS_LOGGED_IN } from "constants/actionTypes";

const initialState = {
  isAdminLoggedIn: false,
};

const adminAuth = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_AUTH_SET_IS_LOGGED_IN:
      return {
        ...state,
        isAdminLoggedIn: action.isAdminLoggedIn,
      };

    default:
      return state;
  }
};

export default adminAuth;
