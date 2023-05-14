const fs = require("fs");

const logger = require("../../debug/logger");
const utf8Chars = require("../../constants/utf8Chars");
const parseMultipartForm = require("../../helpers/parseMultipartForm");
const saveProjectButtonFiles = require("../../localFiles/saveProjectButtonFiles");

// server-side logs
const logSuccess = (id, title) =>
  logger.debug(
    `${utf8Chars.checkMark} button files set for project { id: ${id} title: ${title} }`
  );
const logFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} unable to set project button files, error occured:`
  );
  logger.error(err);
};
// client-side messages
const messageSuccess = "Project button files uploaded";
const messageFailure = "Unable to set project button files";

const getButtonFileRoute = async (req, res, next) => {
  const { projectId, filename } = req.params;
  try {
    const files = await parseMultipartForm(req);
    await saveProjectButtonFiles(projectId, files);
    res.status(200).json({ message: messageSuccess });
  } catch (err) {
    logFailure(err);
    res.status(500).json({ message: messageFailure });
  }
};

module.exports = getButtonFileRoute;
