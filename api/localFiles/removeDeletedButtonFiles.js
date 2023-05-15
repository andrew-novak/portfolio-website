const downloadDirs = require("./downloadDirs");

const checkOldButton = (projectId, newButtons, oldButton) =>
  new Promise(async (resolve, reject) => {
    const newButtonSameFilename = newButtons.find(
      (newButton) => newButton.filename === oldButton.filename
    );
    // no button with this filename exists anymore (remove file)
    if (!newButtonSameFilename) {
      await downloadDirs.removeFile(projectId, oldButton.filename);
      return resolve();
    }
    // same filename, but uploading a new file (remove file)
    if (
      oldButton.isAwaitingFileUpload === false &&
      newButtonSameFilename.isAwaitingFileUpload === true
    ) {
      await downloadDirs.removeFile(projectId, oldButton.filename);
      return resolve();
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
