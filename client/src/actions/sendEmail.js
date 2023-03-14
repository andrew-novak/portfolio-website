import axios from "axios";

import { API_URL } from "constants/urls";
import { setErrorSnackbar, setSuccessSnackbar } from "actions/snackbar";

const sendEmail =
  ({ clientEmail, message, onSuccessRedirect }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/sendEmail`, {
        clientEmail,
        message,
      });
      dispatch(setSuccessSnackbar("Email sent successfully"));
      onSuccessRedirect();
    } catch (err) {
      const { status } = err.response;
      const { message } = err.response.data;
      // Wrong email & message fields
      if (
        status === 400 &&
        message === '"clientEmail", "message" value(s) failed validation.'
      ) {
        return dispatch(setErrorSnackbar("Invalid email and message"));
      }
      // Wrong email field
      if (
        status === 400 &&
        message === '"clientEmail" value(s) failed validation.'
      ) {
        return dispatch(setErrorSnackbar("Invalid email"));
      }
      // Wrong message field
      if (
        status === 400 &&
        message === '"message" value(s) failed validation.'
      ) {
        return dispatch(setErrorSnackbar("Invalid message"));
      }
      // Other error
      return dispatch(setErrorSnackbar("Failed to send the email"));
    }
  };

export default sendEmail;
