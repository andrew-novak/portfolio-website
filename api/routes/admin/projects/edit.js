const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const saveProjectMedia = require("../../../localFiles/saveProjectMedia");
const mergeMediaFilenames = require("../../../helpers/mergeMediaFilenames");
const mediaDirs = require("../../../localFiles/mediaDirs");

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
const successLog = (id, title) =>
  logger.debug(
    `${utf8Chars.checkMark} updated project { id: ${id} title: ${title} }`
  );
const failureLog = (err) => {
  logger.error(`${utf8Chars.xMark} no project updated, error occured:`);
  logger.error(err);
};
// client-side messages
const failureMessage = "An error occurred during a product update";

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
const editProject = async (req, res, next) => {
  logRequestBody(req.body);
  const { projectId } = req.params;
  const {
    // TODO: add 'order' prop management
    title,
    description,
    // TODO: check if these mediaFilenames are equal to existing mediaFilenames
    mediaFilenames: oldMediaFilenames,
    mediaDataUrls,
  } = req.body;
  // TODO: add media deletion
  const newMediaFilenames = await saveProjectMedia(
    projectId,
    mediaDataUrls,
    oldMediaFilenames
  );
  const mediaFilenames = mergeMediaFilenames(
    newMediaFilenames,
    oldMediaFilenames
  );
  try {
    await Project.updateOne(
      { id: projectId },
      { title, description, mediaFilenames }
    );
    successLog(projectId, title);
    res.status(200).json({});
  } catch (err) {
    // remove added filenames
    mediaDirs.removeMediaFiles(projectId, newMediaFilenames);
    failureLog(err);
    res.status(500).json({ message: failureMessage });
  }
};

module.exports = editProject;
