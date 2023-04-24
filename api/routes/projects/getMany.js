const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const Project = require("../../models/Project");

// server-side logs
const logProjectCount = (count) =>
  logger.debug(`${utf8Chars.checkMark} ${count} project(s) retrieved`);
const logFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to retrieve multiple projects, error occured:`
  );
  logger.error(err);
};
// client-side messages
const messageFailure = "Unable to retrieve projects";

const getProjectsRoute = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ position: "descending" });
    logProjectCount(projects.length);
    const frontendProjects = projects.map((project) => {
      //const { _id: _, ...description } = project.getFirstDescription();
      //const { _id: __, ...mediaFilename } = project.getFirstMediaFilename();
      return {
        id: project.id,
        position: project.position,
        colors: project.colors,
        title: project.title,
        description: project.getFirstDescription(),
        mediaFilename: project.getFirstMediaFilename(),
      };
    });
    res.status(200).json({ projects: frontendProjects });
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageFailure });
  }
};

module.exports = getProjectsRoute;
