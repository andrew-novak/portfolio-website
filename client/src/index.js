import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "serviceWorker";

import Snackbar from "components/Snackbar";
import store from "store";
import theme from "theme";
import Routes from "Routes";

const App = () => {
  // Router and routes are separated due to this error:
  // Error: useLocation() may be used only in the context of a <Router> component.
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
