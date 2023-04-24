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
const logNotFound = (id) =>
  logger.debug(`${utf8Chars.xMark} project not found { id: ${id} }`);
const logProjectMoved = (id, title, origin, target) =>
  logger.debug(
    `${utf8Chars.checkMark} project position move ${origin} -> ${target} { id: ${id}, title: ${title} }`
  );
const logSuccess = (id, title) =>
  logger.debug(
    `${utf8Chars.checkMark} updated project { id: ${id} title: ${title} }`
  );
const logFailure = (err) => {
  logger.error(`${utf8Chars.xMark} no project updated, error occured:`);
  logger.error(err);
};
// client-side messages
const messageNotFound = "Project not found";
const messageFailure = "Unable to edit the project";

/*
example project in db:
project {
  id: 12,
  position: 0,
  colors: [String, String]
  title: "Project Name",
  descriptionList: [RawDraftContentState, RawDraftContentState, ...],
  mediaFilenames: ["media_2321477.jpg", "media_1351776.png", ...]
}
*/
const editProjectRoute = async (req, res, next) => {
  logRequestBody(req.body);
  const { projectId } = req.params;
  const {
    position,
    colors,
    title,
    descriptionList,
    // TODO: check if these mediaFilenames are equal to existing mediaFilenames
    mediaFilenames: oldMediaFilenames,
    mediaDataUrls,
  } = req.body;
  console.log(descriptionList);
  let newMediaFilenames = [];
  try {
    // project existence
    const originalProject = await Project.findOne({ id: projectId });
    if (!originalProject) {
      logNotFound(projectId);
      return res.status(400).json({ message: messageNotFound });
    }

    // positions
    if (position) {
      await Project.move(originalProject.position, position);
      logProjectMoved(
        originalProject.id,
        originalProject.title,
        originalProject.position,
        position
      );
    }

    // media files
    // TODO: add media deletion
    newMediaFilenames = await saveProjectMedia(
      projectId,
      mediaDataUrls,
      oldMediaFilenames
    );
    const mediaFilenames = mergeMediaFilenames(
      newMediaFilenames,
      oldMediaFilenames
    );

    // update document (except positions)
    await Project.updateOne(
      { id: projectId },
      { colors, title, descriptionList, mediaFilenames }
    );
    logSuccess(projectId, title);
    res.status(200).json({});
  } catch (err) {
    // remove added filenames
    mediaDirs.removeMediaFiles(projectId, newMediaFilenames);
    logFailure(err);
    res.status(500).json({ message: messageFailure });
  }
};

module.exports = editProjectRoute;
