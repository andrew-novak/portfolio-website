const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const mediaDirs = require("../../helpers/localFiles/mediaDirs");
const saveIntroImage = require("../../helpers/localFiles/saveIntroImage");
const Intro = require("../../models/Intro");

// server-side logs
const logFileDoesNotExist = (err, filename) =>
  logger.warn(
    `${utf8Chars.warning} unable to remove non-existent intro image file: ${filename}`
  );
const logSuccess = () =>
  logger.debug(`${utf8Chars.checkMark} intro created/edited`);
const logError = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to create/edit intro, error occured:`
  );
  logger.error(err);
};
// client-side messages
const messageNotFound = "The intro does not exist";
const messageError = "Unable to create/edit an intro";

// create or edit intro
// only max 1 intro available
const setIntroRoute = async (req, res, next) => {
  const { imageFilename, imageDataUrl, text, colors } = req.body;

  //console.log(imageDataUrl && imageDataUrl.substring(0, 30));

  const isNoImagePassed = !imageFilename && !imageDataUrl;
  let newImageFilename = null;
  try {
    const intro = await Intro.findOne({});
    // if a client uploaded a new image
    if (imageDataUrl) {
      // remove old file (intro will have a new image)
      if (intro?.imageFilename) {
        try {
          await mediaDirs.removeIntroImage(intro.imageFilename);
        } catch (err) {
          if (err.code === "ENOENT") {
            logFileDoesNotExist(err, intro.imageFilename);
          } else {
            throw err;
          }
        }
      }
      // create new file
      newImageFilename = await saveIntroImage(imageDataUrl);
    }
    // remove old file (intro will have no image)
    if (isNoImagePassed && intro?.imageFilename) {
      try {
        await mediaDirs.removeIntroImage(intro.imageFilename);
      } catch (err) {
        if (err.code === "ENOENT") {
          logFileDoesNotExist(err, intro.imageFilename);
        } else {
          throw err;
        }
      }
    }
    // if there is an intro already
    if (intro) {
      const isFileReplaced = !!newImageFilename;
      // there 2 cases in which we want to update image field:
      // 1. no intro file (we set it to null in case a file has been recently removed)
      // 2. a new file has been uploaded
      const isUpdatingImageField = isNoImagePassed || isFileReplaced;
      await Intro.updateOne(
        {},
        {
          $set: {
            ...(text && { text }),
            ...(colors && { colors }),
            ...(isUpdatingImageField && { imageFilename: newImageFilename }),
          },
        }
      );
    }
    // if no intro yet
    if (!intro) {
      await Intro.create({
        imageFilename: newImageFilename,
        text,
      });
    }
    logSuccess();
    res.status(200).json({});
  } catch (err) {
    logError(err);
    if (newImageFilename) {
      mediaDirs.removeIntroImage(newImageFilename);
    }
    res.status(500).json({ message: messageError });
  }
};

module.exports = setIntroRoute;
