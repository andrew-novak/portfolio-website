const fs = require("fs");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
const PROD_MEDIA = process.env.ANOVAK_SITE_PROD_MEDIA;
const mediaRoot =
  NODE_ENV === "production" ? PROD_MEDIA : path.join(__dirname, "../devMedia");

const getRootPath = () => mediaRoot;

const createNeccessaryDirs = () => {
  const projectsPath = path.join(mediaRoot, "projects");
  const dirPaths = [mediaRoot, projectsPath];
  dirPaths.forEach((path) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  });
};

// a single-project dir path:
// <all media dir>/projects/project_<id>
const getProjectPath = (projectId) =>
  path.join(mediaRoot, "projects", `project_${projectId}`);

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

module.exports = {
  getRootPath,
  createNeccessaryDirs,
  getProjectPath,
  createProjectDir,
  removeProjectDir,
};
