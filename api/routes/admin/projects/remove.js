const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const mediaDirs = require("../../../localFiles/mediaDirs");

// server-side logs
const successLog = (id, title) =>
  logger.debug(
    `${utf8Chars.checkMark} deleted project (id/title): ${id} ${title}`
  );
const notExistLog = (id) =>
  logger.debug(`${utf8Chars.xMark} no project with id: ${id}`);
const failureLog = (err) =>
  logger.debug(
    `${utf8Chars.xMark} error during project deletion:\n${JSON.stringify(err)}`
  );
// client-side messages
const projectNotFoundMessage = (projectId) =>
  `The project with id ${projectId} does not exist`;
const failureMessage = "An error occurred during a product creation";

const removeProjectRoute = async (req, res, next) => {
  console.log("############ req.body:", req.body);
  console.log(req.params);
  const { projectId } = req.params;
  let projectTitle;
  try {
    const deletedProject = await Project.deleteOne({ id: projectId });
    if (!deletedProject) {
      notExistLog(projectId);
      return res
        .status(400)
        .json({ message: projectNotFoundMessage(projectId) });
    }
    projectTitle = deletedProject.title;
    await mediaDirs.removeProjectDir(projectId);
    successLog(projectId, projectTitle);
    res.status(200).json({});
  } catch (err) {
    failureLog(err);
    res.status(500).json({ message: failureMessage });
  }
};

module.exports = removeProjectRoute;
