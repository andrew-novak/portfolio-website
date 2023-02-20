import {
  PROJECT_SET,
  PROJECT_SET_TITLE,
  PROJECT_SET_DESCRIPTION,
  PROJECT_MEDIA_LIST_ADD,
  PROJECT_MEDIA_LIST_ADD_VIDEO,
  PROJECT_MEDIA_LIST_SET,
  PROJECT_MEDIA_DIALOG_SET,
} from "constants/actionTypes";

const initialState = {
  title: "",
  description: "",
  mediaList: [
    /*
    examples:
    { serverFilename: "42342.jpg", clientLocalUrl: null, clientMimeType: null }
    { serverFilename: null, clientLocalUrl: "blob:http://...", clientMimeType: "image/png" }
    { serverFilename: null, clientLocalUrl: "blob:http://...", clientMimeType: "video/mp4",  }
    serverFilename & clientLocalUrl are the only properties sent to server
    */
  ],
  mediaDialog: {
    dialogViariant: null,
    file: null,
  },
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_SET:
      return {
        ...action.project,
        mediaDialog: {
          ...state.mediaDialog,
        },
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

    case PROJECT_MEDIA_LIST_SET:
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

    case PROJECT_MEDIA_DIALOG_SET:
      return {
        ...state,
        mediaDialog: {
          dialogVariant: action.dialogVariant,
          file: action.file,
        },
      };

    default:
      return state;
  }
};

export default project;
