import axios from "axios";

import { API_URL } from "constants/urls";

const projectRemove = (id) => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");

  console.log("remove project with id:", id);

  const response = await axios.delete(`${API_URL}/admin/projects/${id}`, {
    headers: { Authorization: "Bearer " + idToken },
  });
};

export default projectRemove;
