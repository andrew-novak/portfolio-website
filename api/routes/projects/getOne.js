const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const Project = require("../../models/Project");

// server-side logs
const logProjectFound = (project) =>
  logger.debug(
    `${utf8Chars.checkMark} project { id: ${project.id} title: ${project.title} } found`
  );
const logProjectNotFound = (project) =>
  logger.error(`${utf8Chars.xMark} project { id: ${project.id} } not found`);
const logFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to retrieve single project, error occured:`
  );
  logger.error(err);
};
// client-side messages
const messageNotFound = "The project does not exist";
const messageError = "Unable to retrieve the project";

const getProjectRoute = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ id: projectId });
    if (!project) {
      logProjectNotFound();
      return res.status(400).json({ message: messageNotFound });
    }
    logProjectFound(project);
    const frontendProject = {
      id: project.id,
      order: project.order,
      title: project.title,
      description: project.description,
      mediaFilenames: project.mediaFilenames,
    };
    res.status(200).json({ project: frontendProject });
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageError });
  }
};

module.exports = getProjectRoute;
