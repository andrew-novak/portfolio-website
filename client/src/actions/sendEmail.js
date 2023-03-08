import axios from "axios";

import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";
import { API_URL } from "constants/urls";

const sendEmail = (emailForm) => async (dispatch) => {
  const { clientEmail, clientEmailRepeat, message } = emailForm;
  if (clientEmail !== clientEmailRepeat) {
    return dispatch(
      setErrorSnackbar("Email and repeat email are not the same")
    );
  }
  console.log("client email:", clientEmail);
  const response = await axios.post(`${API_URL}/sendEmail`, {
    clientEmail,
    message,
  });
  console.log(response);
};

export default sendEmail;
