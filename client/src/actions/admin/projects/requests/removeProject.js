import axios from "axios";

import { API_URL } from "constants/urls";
import { setSuccessSnackbar, setErrorSnackbar } from "actions/snackbar";
import handleNetworkError from "actions/handleNetworkError";

const projectRemove = (id, onSuccessRedirect) => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");
  try {
    await axios.delete(`${API_URL}/admin/projects/${id}`, {
      headers: { Authorization: "Bearer " + idToken },
    });
    dispatch(setSuccessSnackbar("Project removed"));
    return onSuccessRedirect();
  } catch (err) {
    console.error(err);
    if (err.message === 'Network Error') {
      return dispatch(handleNetworkError());
    }
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to remove the project"
      )
    );
  }
};

export default projectRemove;
