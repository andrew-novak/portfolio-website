const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");

// server-side logs
const logProjectFound = (project) =>
  logger.debug(
    `${utf8Chars.checkMark} found project { id: ${project.id} title: ${project.title} }`
  );
const logProjectPositionsCount = (count) =>
  logger.debug(`${utf8Chars.checkMark} ${count} project position(s) retrieved`);
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
    // get project
    const project = await Project.findOne({ id: projectId });
    if (!project) {
      logProjectNotFound();
      return res.status(400).json({ message: messageNotFound });
    }
    logProjectFound(project);
    const frontendProject = {
      id: project.id,
      position: project.position,
      colors: project.colors,
      title: project.title,
      descriptionList: project.descriptionList,
      mediaFilenames: project.mediaFilenames,
      buttons: project.buttons,
    };
    // get position & name for all projects
    // (for position change)
    const projects = await Project.find({}).sort({ position: "descending" });
    const projectPositions = projects.map((project) => ({
      position: project.position,
      title: project.title,
    }));
    logProjectPositionsCount(projectPositions.length);
    // send data
    res.status(200).json({ project: frontendProject, projectPositions });
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageError });
  }
};

module.exports = getProjectRoute;
