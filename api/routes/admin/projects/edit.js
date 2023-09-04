const logger = require("../../../debug/logger");
const utf8Chars = require("../../../constants/utf8Chars");
const Project = require("../../../models/Project");
const ongoingDataUpdate = require("../../../state/ongoingDataUpdate");
const saveProjectMedia = require("../../../helpers/localFiles/saveProjectMedia");
const mergeMediaFilenames = require("../../../helpers/mergeMediaFilenames");
const buttonFieldsToBackend = require("../../../helpers/buttonFieldsToBackend");
const removeDeletedButtonFiles = require("../../../helpers/localFiles/removeDeletedButtonFiles");
const mediaDirs = require("../../../helpers/localFiles/mediaDirs");

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
    mediaFilenames: keptMediaFilenames,
    mediaDataUrls,
    buttons,
  } = req.body;
  let newMediaFilenames = [];
  try {
    // project existence
    const originalProject = await Project.findOne({ id: projectId });
    if (!originalProject) {
      logNotFound(projectId);
      res.status(400).json({ message: messageNotFound });
      return ongoingDataUpdate.end();
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

    // media
    // --- remove deleted files ---
    originalProject.mediaFilenames.forEach((filename) => {
      if (!keptMediaFilenames.includes(filename)) {
        mediaDirs.removeMediaFile(projectId, filename);
      }
    });
    // --- save new files ----
    newMediaFilenames = await saveProjectMedia(
      projectId,
      mediaDataUrls,
      keptMediaFilenames
    );
    // --- merge recently added and kept filenames ---
    const mediaFilenames = mergeMediaFilenames(
      newMediaFilenames,
      keptMediaFilenames
    );

    // buttons
    const newButtons = await buttonFieldsToBackend(projectId, buttons);
    await removeDeletedButtonFiles(
      projectId,
      newButtons,
      originalProject.buttons
    );

    // update document (except positions)
    await Project.updateOne(
      { id: projectId },
      {
        colors,
        title,
        descriptionList,
        mediaFilenames,
        buttons: newButtons,
      }
    );
    logSuccess(projectId, title);
    res.status(200).json({});
    return ongoingDataUpdate.end();
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageFailure });
    // remove added filenames
    await mediaDirs.removeMediaFiles(projectId, newMediaFilenames);
    return ongoingDataUpdate.end();
  }
};

module.exports = editProjectRoute;
