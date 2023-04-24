import { convertFromRaw, EditorState } from "draft-js";

import getMedia from "helpers/getMedia";
import supportedMimeTypes from "constants/supportedMimeTypes";

// convert raw JS object to DraftJS EditorState
const rawToEditorState = (rawJSObject) => {
  const contentState = convertFromRaw(rawJSObject);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};

// convert one backend mediaFilename to frontend media object
// e.g. "myImage.jpg" -> { serverFilename, serverUrl, mimeType, displayType }
const mediaFilenameToObject = (projectId, filename) => {
  const serverUrl = getMedia.oneProjectFileUrl(projectId, filename);
  const extension = filename ? filename.split(".").pop() : null;
  const supportedType = supportedMimeTypes.find(
    (obj) => obj.extension === extension
  );
  const mimeType = supportedType ? supportedType.mimeType : null;
  const displayType = supportedType ? supportedType.displayType : null;
  return {
    serverFilename: filename,
    serverUrl,
    mimeType,
    displayType,
  };
};

// for projects grid page
const getSimplifiedProject = (project) => {
  const { id: projectId, description: rawDescription, mediaFilename } = project;
  // Description: raw JS object -> DraftJS EditorState -> string
  const description = !rawDescription
    ? null
    : rawToEditorState(rawDescription)
        .getCurrentContent()
        .getPlainText("\u0001");
  // Media: media filename -> media object
  const media = !mediaFilename
    ? null
    : mediaFilenameToObject(projectId, mediaFilename);
  // No need to convert rest of project props
  return { ...project, description, media };
};

// for project view & edit page
const getFullProject = (project) => {
  const {
    id: projectId,
    descriptionList: rawDescriptionList,
    mediaFilenames,
  } = project;
  // Description: raw JS object array -> DraftJS EditorState array
  const descriptionList = rawDescriptionList.map((description) =>
    !description ? null : rawToEditorState(description)
  );
  // Media: media filenames -> media objects
  /*const mediaList = mediaFilenames.map((filename) =>
    mediaFilenameToObject(projectId, filename)
  );*/
  const mediaList = mediaFilenames.map((filename, index) =>
    !filename ? null : mediaFilenameToObject(projectId, filename)
  );
  // No need to convert rest of project props
  return { ...project, descriptionList, mediaList };
};

const apiProjectToFrontend = {
  full: getFullProject,
  simplified: getSimplifiedProject,
};

export default apiProjectToFrontend;
