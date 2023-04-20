import {
  convertFromHTML,
  ContentState,
  convertFromRaw,
  EditorState,
} from "draft-js";

import getMedia from "helpers/getMedia";
import supportedMimeTypes from "constants/supportedMimeTypes";

const apiProjectToFrontend = (project) => {
  const { id, description: rawDescription, mediaFilenames } = project;

  // Description
  let contentState;
  if (typeof rawDescription === "string" || rawDescription instanceof String) {
    const blocks = convertFromHTML(`<p>${rawDescription}</p>`);
    contentState = ContentState.createFromBlockArray(
      blocks.contentBlocks,
      blocks.entityMap
    );
  } else {
    contentState = convertFromRaw(rawDescription);
  }
  const description = EditorState.createWithContent(contentState);

  // Media
  // Converting server-side media filenames to client-side media objects containing more info
  const mediaList = mediaFilenames.map((filename) => {
    const serverUrl = getMedia.oneProjectFileUrl(id, filename);
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
  });

  return { ...project, description, mediaFilenames: null, mediaList };
};

export default apiProjectToFrontend;
