import { setErrorSnackbar } from "actions/snackbar";
import { NETWORK_ERROR } from "constants/actionTypes";

const handleNetworkError = () => (dispatch) => {
  dispatch(
    setErrorSnackbar("Unable to connect")
  );
  dispatch({ type: NETWORK_ERROR });
}

export default handleNetworkError;
