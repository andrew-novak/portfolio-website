const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const mediaDirs = require("../../localFiles/mediaDirs");
const saveIntroImage = require("../../localFiles/saveIntroImage");
const Intro = require("../../models/Intro");

// server-side logs
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
  const { imageDataUrl, text } = req.body;

  let newImageFilename = null;
  try {
    const intro = await Intro.findOne({});
    // if a client uploaded a new image
    if (imageDataUrl) {
      // remove old file
      if (intro?.imageFilename) {
        await mediaDirs.removeIntroImage(intro.imageFilename);
      }
      // create new file
      newImageFilename = await saveIntroImage(imageDataUrl);
    }
    // if there is an intro already
    if (intro) {
      await Intro.updateOne(
        {},
        {
          $set: {
            ...(newImageFilename && { imageFilename: newImageFilename }),
            ...(text && { text }),
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
