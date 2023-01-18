const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const Project = require("../../models/Project");

// server-side logs
const logProjectCount = (count) => logger.debug(`${count} project(s) found`);
const failureLog = (err) =>
  logger.debug(
    `${
      utf8Chars.xMark
    } error during multiple projects retrival:\n${JSON.stringify(err)}`
  );
// client-side messages
const failureMessage = "An error occurred during multiple projects retrieval";

const getProjectsRoute = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    logProjectCount(projects.length);
    const selectedPropsProjects = projects.map((project) => ({
      id: project.id,
      order: project.order,
      title: project.title,
      description: project.description,
      mediaFilenames: project.mediaFilenames,
    }));
    res.status(200).json({ projects: selectedPropsProjects });
  } catch (err) {
    logger.error(err);
    failureLog(err);
    res.status(500).json({ message: failureMessage });
  }
};

module.exports = getProjectsRoute;
