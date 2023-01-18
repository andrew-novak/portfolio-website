import { RESET_STATE } from "constants/actionTypes";

//const resetState = () => (dispatch) => localStorage.clear();
const resetState = () => (dispatch) => dispatch({ type: RESET_STATE });

export default resetState;
