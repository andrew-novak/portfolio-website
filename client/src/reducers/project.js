import {
  PROJECT_SET,
  PROJECT_SET_POSITION,
  PROJECT_SET_TITLE,
  PROJECT_SET_DIALOG_COLOR,
  PROJECT_SET_DIALOG_MEDIA,
  PROJECT_SET_DIALOG_EDIT_MEDIA,
  PROJECT_SET_DESCRIPTION,
  PROJECT_SET_COLOR,
  PROJECT_SET_MEDIA_LIST,
  PROJECT_MEDIA_LIST_ADD,
  PROJECT_MEDIA_LIST_ADD_VIDEO,
} from "constants/actionTypes";

const initialState = {
  // dialogs
  mediaDialog: {
    dialogViariant: null,
    file: null,
  },
  mediaEditDialog: {
    index: null,
    url: null,
  },
  colorDialog: {
    index: null,
    color: null,
  },
  // form
  positions: null,
  positionIndex: null,
  position: null,
  title: "",
  description: "",
  colors: {
    0: "#f8f1ff",
    1: "#eff2fc",
  },
  mediaList: [
    /*
    examples:
    { serverFilename: "42342.jpg", clientLocalUrl: null, clientMimeType: null }
    { serverFilename: null, clientLocalUrl: "blob:http://...", clientMimeType: "image/png" }
    { serverFilename: null, clientLocalUrl: "blob:http://...", clientMimeType: "video/mp4",  }
    serverFilename & clientLocalUrl are the only properties sent to server
    */
  ],
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_SET_DIALOG_COLOR:
      return {
        ...state,
        colorDialog: {
          ...state.colorDialog,
          ...(action.index !== undefined && { index: action.index }),
          ...(action.color !== undefined && { color: action.color }),
        },
      };

    case PROJECT_SET_DIALOG_MEDIA:
      return {
        ...state,
        mediaDialog: {
          dialogVariant: action.dialogVariant,
          file: action.file,
        },
      };

    case PROJECT_SET_DIALOG_EDIT_MEDIA:
      return {
        ...state,
        mediaEditDialog:
          action.mediaEditDialog === null
            ? initialState.mediaEditDialog
            : action.mediaEditDialog,
      };

    case PROJECT_SET:
      return {
        ...initialState,
        ...action.project,
      };

    case PROJECT_SET_POSITION:
      return {
        ...state,
        positions: action.positions,
        positionIndex: action.positionIndex,
        position: action.position,
      };

    case PROJECT_SET_TITLE:
      return {
        ...state,
        title: action.title,
      };

    case PROJECT_SET_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };

    case PROJECT_SET_COLOR:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.index]: action.color,
        },
      };

    case PROJECT_SET_MEDIA_LIST:
      return {
        ...state,
        mediaList: action.newMediaList,
      };

    case PROJECT_MEDIA_LIST_ADD:
      return {
        ...state,
        mediaList: [
          ...state.mediaList,
          {
            serverFilename: null,
            serverUrl: null,
            clientLocalUrl: action.localUrl,
            mimeType: action.mimeType,
            displayType: action.displayType,
          },
        ],
      };

    case PROJECT_MEDIA_LIST_ADD_VIDEO:
      return {
        ...state,
        mediaList: [
          ...state.mediaList,
          {
            serverFilename: null,
            serverUrl: null,
            clientLocalUrl: action.videoUrl,
            coverUrl: action.coverUrl,
            mimeType: action.mimeType,
            displayType: action.displayType,
          },
        ],
      };

    default:
      return state;
  }
};

export default project;
