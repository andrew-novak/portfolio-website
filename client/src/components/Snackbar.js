import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { connect } from "react-redux";

import { closeSnackbar } from "actions/snackbar";
import useWindowDimensions from "hooks/useWindowDimensions";

const Snackbar = ({ isOpen, severity, message, closeSnackbar }) => {
  const { height, width } = useWindowDimensions();
  const isLargerScreen = width > 600;
  return (
    <MuiSnackbar
      open={isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={closeSnackbar}
    >
      <Alert
        severity={severity}
        sx={{
          width: "100%",
          "& .MuiAlert-icon": { fontSize: isLargerScreen ? 45 : 30 },
          fontSize: isLargerScreen ? 30 : 20,
        }}
        onClose={closeSnackbar}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

const mapState = (state) => {
  const { isOpen, severity, message } = state.snackbar;
  return { isOpen, severity, message };
};

export default connect(mapState, { closeSnackbar })(Snackbar);
