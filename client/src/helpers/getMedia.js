import { MEDIA_URL } from "constants/urls";

export const oneProjectFileUrl = (projectId, filename) => {
  if (projectId === undefined || projectId === null)
    throw new Error("projectId argument is undefined or null");
  if (filename === undefined || filename === null)
    throw new Error("filename arguemnt is undefined or null");

  return `${MEDIA_URL}/projects/project_${projectId}/${filename}`;
};

export default { oneProjectFileUrl };
