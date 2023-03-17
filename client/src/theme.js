import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 0.87)",
      //contrastText: "#716f6f",
    },
    text: {
      primary: "#525252",
    },
    background: {
      // default: "rgb(237, 237, 237)",
      default: "#ffffff",
    },
  },
  overrides: {
    MuiCard: {
      root: {},
    },
  },
  custom: {
    elevation: 1,
    margins: {
      section: 8,
      element: 2,
    },
    colors: {
      activityInactive: "rgb(184, 184, 184)",
      activity: "rgb(94, 126, 133)",
      //activity: "rgb(92, 92, 92)",
      outline: "rgba(0, 0, 0, 0.23)",
      outlineHover: "rgba(0, 0, 0, 0.87)",
      inputLabel: "rgba(0, 0, 0, 0.6)",
    },
    cssProps: {
      outlineBorderRadius: "4px",
    },
    muiProps: {
      largeTitleVariant: "h3",
    },
    styles: {
      inputLabel: {
        color: "rgba(0, 0, 0, 0.6)",
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: "1.4375em",
        letterSpacing: "0.00938em",
      },
    },
    selectionBorderWidth: 2,
    heightPercentRatios: {
      "1:1": "100%",
      "4:3": "75%",
      "3:2": "66.6%",
      "16:9": "56.25%",
    },
  },
});

theme.overrides.MuiCard.root.color = theme.palette.primary.contrastText;

export default theme;
