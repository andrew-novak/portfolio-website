const path = require("path");
const fs = require("fs");

const { staticFilesRoot } = require("../../constants/paths");

const mediaRoot = path.join(staticFilesRoot, "media");
const getRootPath = () => mediaRoot;

const createNeccessaryDirs = () => {
  const projectsPath = path.join(mediaRoot, "projects");
  const dirPaths = [staticFilesRoot, mediaRoot, projectsPath];
  dirPaths.forEach((path) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  });
};

// a single-project dir path:
// <static dir>/media/projects/project_<id>
const getProjectPath = (projectId) =>
  path.join(mediaRoot, "projects", `project_${projectId}`);

const isThereProjectDir = (projectId) => {
  const projectDir = getProjectPath(projectId);
  if (fs.existsSync(projectDir)) return true;
  return false;
};

const createProjectDir = async (projectId) => {
  const projectDir = getProjectPath(projectId);
  await fs.promises.mkdir(projectDir).catch((err) => {
    throw new Error(err);
  });
};

const removeProjectDir = async (projectId) => {
  const projectDir = getProjectPath(projectId);
  await fs.promises
    .rm(projectDir, { recursive: true, force: true })
    .catch((err) => {
      throw new Error(err);
    });
};

const removeIntroImage = async (filename) => {
  const imagePath = path.join(mediaRoot, filename);
  await fs.promises.rm(imagePath);
};

const removeMediaFile = async (projectId, filename) => {
  const projectDir = getProjectPath(projectId);
  const mediaPath = path.join(projectDir, filename);
  await fs.promises.rm(mediaPath);
};

const removeMediaFiles = async (projectId, filenames) => {
  await Promise.all(
    filenames.map((filename) =>
      !filename ? null : removeMediaFile(projectId, filename)
    )
  );
};

module.exports = {
  getRootPath,
  createNeccessaryDirs,
  getProjectPath,
  isThereProjectDir,
  createProjectDir,
  removeIntroImage,
  removeProjectDir,
  removeMediaFile,
  removeMediaFiles,
};
