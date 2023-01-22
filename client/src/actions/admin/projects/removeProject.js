import axios from "axios";

import { API_URL } from "constants/urls";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

const projectRemove = (id, onSuccessRedirect) => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");

  const response = await axios.delete(`${API_URL}/admin/projects/${id}`, {
    headers: { Authorization: "Bearer " + idToken },
  });

  if (response.status !== 200) {
    return dispatch(setErrorSnackbar("Project removal failed"));
  }

  dispatch(setSuccessSnackbar("Project removed"));
  onSuccessRedirect();
};

export default projectRemove;
