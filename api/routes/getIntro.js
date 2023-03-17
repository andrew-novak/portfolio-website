const logger = require("../debug/logger");
const utf8Chars = require("../constants/utf8Chars");
const Intro = require("../models/Intro");

// server-side logs
const logSuccess = () => logger.debug(`${utf8Chars.checkMark} intro found`);
const logNotFound = () =>
  logger.error(`${utf8Chars.checkMark} intro not found`);
const logError = (err) => {
  logger.error(`${utf8Chars.xMark} unable to retrieve intro, error occured:`);
  logger.error(err);
};
// client-side messages
const messageNotFound = "The intro does not exist";
const messageError = "Unable to retrieve the intro";

const getIntroRoute = async (req, res, next) => {
  try {
    const intro = await Intro.findOne({});
    if (!intro) {
      logNotFound();
      return res.status(500).json({ message: messageNotFound });
    }
    logSuccess();
    const frontendIntro = {
      imageFilename: intro.imageFilename,
      text: intro.text,
    };
    res.status(200).json({ intro: frontendIntro });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: messageError });
  }
};

module.exports = getIntroRoute;
