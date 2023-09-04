const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const ongoingDataUpdate = require("../../../state/ongoingDataUpdate");
const mediaDirs = require("../../../helpers/localFiles/mediaDirs");
const downloadDirs = require("../../../helpers/localFiles/downloadDirs");

// server-side logs
const logSuccess = (id, title) =>
  logger.debug(
    `${utf8Chars.checkMark} project removed (id / title): (${id} / ${title})`
  );
const logNotFound = (id) =>
  logger.error(`${utf8Chars.xMark} unable to find project with id: ${id}`);
const logError = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to remove single project, error occured:`
  );
  logger.error(err);
};

// client-side messages
const messageNotFound = (projectId) => "The project does not exist";
const messageError = "Unable to remove the project";

const removeProjectRoute = async (req, res, next) => {
  console.log("############ req.body:", req.body);
  console.log(req.params);
  const { projectId } = req.params;
  let projectTitle;
  try {
    const deletedProject = await Project.deleteOne({ id: projectId });
    if (!deletedProject) {
      logNotFound(projectId);
      res.status(400).json({ message: messageNotFound(projectId) });
      return ongoingDataUpdate.end();
    }
    projectTitle = deletedProject.title;
    await mediaDirs.removeProjectDir(projectId);
    await downloadDirs.removeProjectDir(projectId);
    logSuccess(projectId, projectTitle);
    res.status(200).json({});
    return ongoingDataUpdate.end();
  } catch (err) {
    logError(err);
    res.status(500).json({ message: messageError });
    return ongoingDataUpdate.end();
  }
};

module.exports = removeProjectRoute;
