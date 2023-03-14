const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const saveProjectMedia = require("../../../localFiles/saveProjectMedia");

// server-side logs
const logRequestBody = (body) => {
  // truncate mediaDataUrls for readability
  logger.debug("request body:");
  logger.debug({
    ...body,
    ...(body.mediaDataUrls && {
      mediaDataUrls: body.mediaDataUrls.map((dataUrl) =>
        dataUrl === null ? dataUrl : dataUrl.slice(0, 50) + "..."
      ),
    }),
  });
};
const logSuccess = (id, title) =>
  logger.debug(
    `${utf8Chars.checkMark} created project { id: ${id} title: ${title} }`
  );
const logFailure = (err) => {
  logger.error(`${utf8Chars.xMark} no project created, error occured:`);
  logger.error(err);
};
// client-side messages
const messageFailure = "An error occurred during a product creation";

/*
example project in db:
project {
  id: 12,
  order: 0,
  title: "Project Name",
  description: "Lorem Ipsum...",
  mediaFilenames: ["media_2321477.jpg", "media_1351776.png"]
}
*/
const createProject = async (req, res, next) => {
  logRequestBody(req.body);
  const { title, description, mediaDataUrls } = req.body;
  const projectId = await Project.getNextId();
  const projectOrder = await Project.getNextOrder();
  const mediaFilenames = await saveProjectMedia(projectId, mediaDataUrls);
  try {
    await Project.create({
      id: projectId,
      order: projectOrder,
      title,
      description,
      mediaFilenames,
    });
    logSuccess(projectId, title);
    res.status(200).json({});
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageFailure });
  }
};

module.exports = createProject;
