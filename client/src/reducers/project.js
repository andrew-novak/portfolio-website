import {
  // dialogs
  PROJECT_SET_COLOR_DIALOG,
  PROJECT_SET_MEDIA_DIALOG,
  PROJECT_SET_EDIT_MEDIA_DIALOG,
  PROJECT_SET_BUTTON_DIALOG,
  PROJECT_SET_BUTTON_DIALOG_BUTTON,
  // fields
  PROJECT_SET,
  PROJECT_SET_POSITION,
  PROJECT_SET_COLOR,
  PROJECT_SET_TITLE,
  PROJECT_SET_DESCRIPTION_LIST,
  PROJECT_SET_DESCRIPTION_ELEMENT,
  PROJECT_SELECT_DESCRIPTION,
  PROJECT_SET_MEDIA_LIST,
  PROJECT_ADD_MEDIA_ELEMENT,
  PROJECT_SET_BUTTON,
} from "constants/actionTypes";

const initialState = {
  // dialogs
  colorDialog: {
    index: null,
    color: null,
  },
  mediaDialog: {
    dialogViariant: null,
    file: null,
  },
  mediaEditDialog: {
    index: null,
    url: null,
  },
  buttonDialog: {
    index: null,
    button: {
      icon: null,
      label: null,
      // each button either redirects or downloads a file
      behaviour: null,
      redirect: null,
      file: null,
    },
  },
  // form
  positions: null,
  positionIndex: null,
  position: null,
  colors: {
    0: "#f8f1ff",
    1: "#eff2fc",
  },
  title: "",
  // array of DraftJS EditorStates
  descriptionList: null,
  descriptionSelectIndex: null,
  /*
  mediaList example:
  [
    { serverFilename: "42342.jpg", clientLocalUrl: null, clientMimeType: null }
    { serverFilename: null, clientLocalUrl: "blob:http://...", clientMimeType: "image/png" }
    { serverFilename: null, clientLocalUrl: "blob:http://...", clientMimeType: "video/mp4",  }
  ]
  note: serverFilename & clientLocalUrl are the only properties send to server
  */
  mediaList: null,
  buttons: null,
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_SET_COLOR_DIALOG:
      return {
        ...state,
        colorDialog: {
          ...state.colorDialog,
          ...(action.index !== undefined && { index: action.index }),
          ...(action.color !== undefined && { color: action.color }),
        },
      };

    case PROJECT_SET_MEDIA_DIALOG:
      return {
        ...state,
        mediaDialog: {
          dialogVariant: action.dialogVariant,
          file: action.file,
        },
      };

    case PROJECT_SET_EDIT_MEDIA_DIALOG:
      return {
        ...state,
        mediaEditDialog:
          action.mediaEditDialog === null
            ? initialState.mediaEditDialog
            : action.mediaEditDialog,
      };

    case PROJECT_SET_BUTTON_DIALOG:
      return {
        ...state,
        buttonDialog:
          action.buttonDialog === "initial"
            ? initialState.buttonDialog
            : {
                ...action.buttonDialog,
                button:
                  action.buttonDialog.button === "initial"
                    ? initialState.buttonDialog.button
                    : action.buttonDialog.button,
              },
      };

    case PROJECT_SET_BUTTON_DIALOG_BUTTON:
      return {
        ...state,
        buttonDialog: {
          ...state.buttonDialog,
          button: action.button,
        },
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

    case PROJECT_SET_COLOR:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.index]: action.color,
        },
      };

    case PROJECT_SET_TITLE:
      return {
        ...state,
        title: action.title,
      };

    case PROJECT_SET_DESCRIPTION_LIST:
      return {
        ...state,
        descriptionList: action.descriptionList,
      };

    case PROJECT_SET_DESCRIPTION_ELEMENT: {
      const descriptionList = [...(state.descriptionList || [])];
      descriptionList[action.index] = action.description;
      return {
        ...state,
        descriptionList,
      };
    }

    case PROJECT_SELECT_DESCRIPTION: {
      const descriptionList = [...(state.descriptionList || [])];
      action.updateDescriptions.forEach((description, index) => {
        if (description) {
          descriptionList[index] = description;
        }
      });
      return {
        ...state,
        descriptionSelectIndex: action.index,
        descriptionList,
      };
    }

    case PROJECT_SET_MEDIA_LIST:
      return {
        ...state,
        mediaList: action.newMediaList,
      };

    case PROJECT_ADD_MEDIA_ELEMENT:
      return {
        ...state,
        mediaList: [
          ...(state.mediaList || []),
          {
            serverFilename: null,
            serverUrl: null,
            clientLocalUrl: action.localUrl,
            // use coverUrl if the main source (clientLocalUrl or serverUrl)
            // is not an image
            ...(action.coverUrl ? { coverUrl: action.coverUrl } : {}),
            mimeType: action.mimeType,
            displayType: action.displayType,
          },
        ],
      };

    case PROJECT_SET_BUTTON: {
      const buttons = [...(state.buttons || [])];
      // If Remove
      if (action.button === "remove") {
        buttons.splice(action.index, 1);
      }
      // If Create/Edit
      else {
        buttons[action.index] = action.button;
      }
      return {
        ...state,
        buttons,
      };
    }

    default:
      return state;
  }
};

export default project;
