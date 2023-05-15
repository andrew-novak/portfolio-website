const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const parseMultipartForm = require("../../../helpers/parseMultipartForm");
const saveProjectButtonFiles = require("../../../localFiles/saveProjectButtonFiles");

// server-side logs
const logNotFound = (projectId) =>
  logger.error(
    `${utf8Chars.xMark} unable to set project button files, project with id ${projectId} not found`
  );
const logSuccess = (projectId, title) =>
  logger.debug(
    `${utf8Chars.checkMark} button files set for project { id: ${projectId} title: ${title} }`
  );
const logFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to set project button files, error occured:`
  );
  logger.error(err);
};
// client-side messages
const messageNotFound = (projectId) =>
  `Project with id ${projectId} not found during button files upload`;
const messageSuccess = "Project button files uploaded";
const messageFailure = "Unable to set project button files";

const setButtonFilesRoute = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ id: projectId });
    if (!project) {
      logNotFound(projectId);
      return res.status(400).json({ message: messageNotFound(projectId) });
    }
    const files = await parseMultipartForm(req);
    await saveProjectButtonFiles(projectId, project, files);
    res.status(200).json({ message: messageSuccess });
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageFailure });
  }
};

module.exports = setButtonFilesRoute;
