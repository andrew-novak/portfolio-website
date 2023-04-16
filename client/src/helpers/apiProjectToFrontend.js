import getMedia from "helpers/getMedia";
import supportedMimeTypes from "constants/supportedMimeTypes";

const apiProjectToFrontend = (project) => {
  const { id, mediaFilenames } = project;
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
  return { ...project, mediaFilenames: null, mediaList };
};

export default apiProjectToFrontend;
