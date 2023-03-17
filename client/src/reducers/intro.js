import {
  INTRO_SET,
  INTRO_SET_DIALOG_IMAGE,
  INTRO_SET_IMAGE,
  INTRO_SET_TEXT,
} from "constants/actionTypes";

const initialState = {
  dialogImage: null,
  image: {},
  /* example property keys:
  image: {
    serverFilename,
    serverUrl,
    clientLocalUrl,
  }
  */
  text: "",
};

const intro = (state = initialState, action) => {
  switch (action.type) {
    case INTRO_SET:
      return {
        image: action.image || initialState.image,
        text: action.text || initialState.text,
      };

    case INTRO_SET_DIALOG_IMAGE:
      return {
        ...state,
        dialogImage: action.dialogImage,
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
