import {
  INTRO_SET,
  INTRO_SET_DIALOG_COLOR,
  INTRO_SET_DIALOG_IMAGE,
  INTRO_SET_COLOR,
  INTRO_SET_IMAGE,
  INTRO_SET_TEXT,
} from "constants/actionTypes";

const initialState = {
  // dialog input
  dialogColor: {
    index: null,
    color: null,
  },
  dialogImage: null,
  // form input
  colors: {
    0: "#e8e8e8",
    1: "#f4f4f4",
  },
  image: {},
  text: "",
  /* example for the above image property:
  image: {
    serverFilename,
    serverUrl,
    clientLocalUrl,
  }
  */
};

const intro = (state = initialState, action) => {
  switch (action.type) {
    case INTRO_SET:
      return {
        ...initialState,
        colors: action.colors || initialState.colors,
        image: action.image || initialState.image,
        text: action.text || initialState.text,
      };

    case INTRO_SET_DIALOG_COLOR:
      return {
        ...state,
        dialogColor: {
          ...state.dialogColor,
          ...(action.index !== undefined && { index: action.index }),
          ...(action.color !== undefined && { color: action.color }),
        },
      };

    case INTRO_SET_DIALOG_IMAGE:
      return {
        ...state,
        dialogImage: action.dialogImage,
      };

    case INTRO_SET_COLOR:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.index]: action.color,
        },
      };

    case INTRO_SET_IMAGE:
      return {
        ...state,
        image: action.image,
      };

    case INTRO_SET_TEXT:
      return {
        ...state,
        text: action.text,
      };

    default:
      return state;
  }
};

export default intro;
