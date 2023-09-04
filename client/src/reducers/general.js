import { NETWORK_ERROR } from "constants/actionTypes";

const initialState = {
  isNetworkError: false,
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return {
        ...state,
        isNetworkError: true,
      };

    default:
      return state;
  }
};

export default general;
