import {
  imageMimeTypes,
  imageExtensions,
  videoMimeTypes,
  videoExtensions,
} from "constants/fileTypes";

export const shouldDisplayImage = (serverExtension, clientMimeType) =>
  imageExtensions.includes(serverExtension) ||
  imageMimeTypes.includes(clientMimeType);

export const shouldDisplayVideo = (serverExtension, clientMimeType) =>
  videoExtensions.includes(serverExtension) ||
  videoMimeTypes.includes(clientMimeType);
