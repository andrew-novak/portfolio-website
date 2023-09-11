const downloadDirs = require("./downloadDirs");
const logger = require("../../debug/logger");

const checkOldButton = (projectId, newButtons, oldButton) =>
  new Promise(async (resolve, reject) => {
    // if old button doesn't have "file" bahaviour then nothing to delete
    if (oldButton.behaviour !== "file") {
      return resolve();
    }
    const newButtonSameFilename = newButtons.find(
      (newButton) => newButton.filename === oldButton.filename
    );
    // no button with this filename exists anymore (remove file)
    try {
      if (!newButtonSameFilename) {
        await downloadDirs.removeFile(projectId, oldButton.filename);

        return resolve();
      }
      // same filename, but uploading a new file (remove file)
      if (newButtonSameFilename.isAwaitingFileUpload === true) {
        await downloadDirs.removeFile(projectId, oldButton.filename);
        return resolve();
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        logger.warn(
          `local button file "${oldButton.filename}" not found, skipping removal`
        );
      } else {
        logger.error(
          `error removing local button file "${oldButton.filename}":`,
          err
        );
      }
    }

    // same filename and not awaiting any file upload (keep file)
    return resolve();
  });

const removeDeletedButtonFiles = async (projectId, newButtons, oldButtons) => {
  const promises = [];
  oldButtons.forEach((oldButton) => {
    promises.push(checkOldButton(projectId, newButtons, oldButton));
  });
  await Promise.all(promises);
};

module.exports = removeDeletedButtonFiles;
