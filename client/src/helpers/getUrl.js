import { MEDIA_URL, DOWNLOAD_URL } from "constants/urls";

export const introMediaFile = (filename) => {
  if (filename === undefined || filename === null) {
    throw new Error("filename argument is undefined or null");
  }
  return `${MEDIA_URL}/${filename}`;
};

export const projectMediaFile = (projectId, filename) => {
  if (projectId === undefined || projectId === null) {
    throw new Error("projectId argument is undefined or null");
  }
  if (filename === undefined || filename === null) {
    throw new Error("filename arguemnt is undefined or null");
  }
  return `${MEDIA_URL}/projects/project_${projectId}/${filename}`;
};

export const projectButtonFile = (projectId, filename) => {
  if (projectId === undefined || projectId === null) {
    throw new Error("projectId argument is undefined or null");
  }
  if (filename === undefined || filename === null) {
    throw new Error("filename arguemnt is undefined or null");
  }
  return `${DOWNLOAD_URL}/projects/project_${projectId}/${filename}`;
};

export default { introMediaFile, projectMediaFile, projectButtonFile };
