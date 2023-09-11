const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const ongoingDataUpdate = require("../../../state/ongoingDataUpdate");
const getAwaitingButtonsFromProject = require("../../../helpers/getAwaitingButtonsFromProject");
const saveButtonFilesForm = require("../../../helpers/localFiles/saveButtonFilesForm");
const downloadDirs = require("../../../helpers/localFiles/downloadDirs");

// server-side logs
const logProjectNotFound = (projectId) =>
  logger.error(
    `${utf8Chars.xMark} unable to set project button files, project with id ${projectId} not found`
  );
const logNoAwaitingButtons = (projectId) =>
  logger.error(
    `${utf8Chars.xMark} unable to set project button files, project with id ${projectId} does not await any button files`
  );
const logFinish = (successfulCount, totalCount, projectId, title) =>
  logger.debug(
    `${utf8Chars.checkMark} ${successfulCount}/${totalCount} button files uploaded successfully for project { id: ${projectId} title: ${title} }`
  );
const logFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to set project button files, error occured:`
  );
  logger.error(err);
};
// client-side messages
const messageProjectNotFound = "Project does not exist.";
const messageNoAwaitingButtons = "Project does not await any button files.";
const messageFinish = (successfulCount, totalCount) =>
  `${successfulCount}/${totalCount} project button files uploaded successfully.`;
const messageFailure = "Unable to set project button files";

const setButtonFilesRoute = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ id: projectId });
    if (!project) {
      logProjectNotFound(projectId);
      res.status(400).json({ message: messageProjectNotFound });
      return ongoingDataUpdate.end();
    }
    // awaitingButtons is obj of buttons
    const awaitingButtons = getAwaitingButtonsFromProject(project);
    if (Object.keys(awaitingButtons).length === 0) {
      logNoAwaitingButtons(projectId);
      res.status(400).json({ message: messageNoAwaitingButtons });
      return ongoingDataUpdate.end();
    }
    //const files = await parseMultipartForm(req);
    //await saveProjectButtonFiles(projectId, project, files);
    const { successfulCount, totalCount } = await saveButtonFilesForm(
      req,
      projectId,
      awaitingButtons
    );
    logFinish(successfulCount, totalCount, projectId, project.title);
    res
      .status(200)
      .json({ message: messageFinish(successfulCount, totalCount) });
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageFailure });
  }
  // remove started but unsuccessful files
  const startedUnsuccessful = ongoingDataUpdate.buttonFiles.startedFilenames.filter(
    (item) => !ongoingDataUpdate.buttonFiles.successfulFilenames.includes(item)
  );
  await downloadDirs.removeFiles(projectId, startedUnsuccessful);
  return ongoingDataUpdate.end();
};

module.exports = setButtonFilesRoute;
