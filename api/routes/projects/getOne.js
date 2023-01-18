const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const Project = require("../../models/Project");

// server-side logs
const logProjectFound = (project) =>
  logger.debug(`project { id: ${project.id} title: ${project.title} } found`);
const failureLog = (err) =>
  logger.debug(
    `${utf8Chars.xMark} error during single project retrival:\n${JSON.stringify(
      err
    )}`
  );
// client-side messages
const failureMessage = "An error occurred during single project retrieval";

const getProjectRoute = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ id: projectId });
    if (project) logProjectFound(project);
    const selectedPropsProject = {
      id: project.id,
      order: project.order,
      title: project.title,
      description: project.description,
      mediaFilenames: project.mediaFilenames,
    };
    res.status(200).json({ project: selectedPropsProject });
  } catch (err) {
    logger.error(err);
    failureLog(err);
    res.status(500).json({ message: failureMessage });
  }
};

module.exports = getProjectRoute;
