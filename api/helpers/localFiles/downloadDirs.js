const path = require("path");
const fs = require("fs");

const { staticFilesRoot } = require("../../constants/paths");

const downloadRoot = path.join(staticFilesRoot, "download");
const getRootPath = () => downloadRoot;

const createNeccessaryDirs = () => {
  const projectsPath = path.join(downloadRoot, "projects");
  const dirPaths = [staticFilesRoot, downloadRoot, projectsPath];
  dirPaths.forEach((path) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  });
};

// a single-project dir path:
// <static dir>/download/projects/project_<id>
const getProjectPath = (projectId) =>
  path.join(downloadRoot, "projects", `project_${projectId}`);

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

const removeFile = async (projectId, filename) => {
  const projectDir = getProjectPath(projectId);
  const mediaPath = path.join(projectDir, filename);
  await fs.promises.rm(mediaPath);
};

const removeFiles = async (projectId, filenames) => {
  await Promise.all(
    filenames.map((filename) =>
      !filename ? null : removeFile(projectId, filename)
    )
  );
};

module.exports = {
  getRootPath,
  createNeccessaryDirs,
  getProjectPath,
  isThereProjectDir,
  createProjectDir,
  removeProjectDir,
  removeFile,
  removeFiles,
};
