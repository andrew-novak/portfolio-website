import axios from "axios";

import { API_URL } from "constants/urls";
import { setSuccessSnackbar, setErrorSnackbar } from "actions/snackbar";

const projectRemove = (id, onSuccessRedirect) => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");
  try {
    const response = await axios.delete(`${API_URL}/admin/projects/${id}`, {
      headers: { Authorization: "Bearer " + idToken },
    });
    dispatch(setSuccessSnackbar("Project removed"));
    return onSuccessRedirect();
  } catch (err) {
    return dispatch(
      setErrorSnackbar(
        err.response?.data?.message || "Unable to remove the project"
      )
    );
  }
};

export default projectRemove;
