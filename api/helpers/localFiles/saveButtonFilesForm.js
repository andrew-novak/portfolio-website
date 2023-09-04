const fs = require("fs")
const path = require("path")
const busBoy = require("busboy");

const downloadDirs = require("./downloadDirs");
const ongoingDataUpdate = require("../../state/ongoingDataUpdate");
const logger = require("../../debug/logger");

const handleFile =
  (projectId, awaitingButtons, filePromises, ...onFileProps) => {
    const [field, readFileStream, { filename, encoding, mimeType }] = onFileProps;

    ongoingDataUpdate.buttonFiles.totalFilenames.push(filename);

    // local paths
    const projectPath = downloadDirs.getProjectPath(projectId);
    const filePath = path.join(projectPath, filename);

    // check if this filename is awaited
    const isAwaited = Object.values(awaitingButtons).some((button) =>
      button.filename === filename && button.isAwaitingFileUpload === true
    );
    if (!isAwaited) {
      return logger.error(`file with name "${filename}" is not awaited`);
    }

    // check if it is a duplicate filename
    if (ongoingDataUpdate.buttonFiles.startedFilenames.indexOf(filename) !== -1) {
      return logger.error(`file with name "${filename}" already uploaded`);
    }

    // check if file already exists
    if (fs.existsSync(filePath)) {
      return logger.error(`file with name "${filename}" already exists`);
    }

    ongoingDataUpdate.buttonFiles.startedFilenames.push(filename);

    // writable stream
    const writeFileStream = fs.createWriteStream(filePath);

    const filePromise = new Promise((resolve, reject) => {
     writeFileStream.on('finish', () => {
       ongoingDataUpdate.buttonFiles.successfulFilenames.push(filename);
       resolve();
     });

     writeFileStream.on('error', (err) => {
       logger.error("An error occurred during button file writing:");
       return logger.error(err);
     });

     readFileStream.on("error", (err) => {
       logger.error("An error occurred during button file writing:");
       return logger.error(err);
     });
   });

    filePromises.push(filePromise);

    // pipe readable to writable
    readFileStream.pipe(writeFileStream);
  }

const saveButtonFilesForm = (req, projectId, awaitingButtons) => {
  return new Promise(async(resolve, reject) => {
    // create project directory if none
    if (!downloadDirs.isThereProjectDir(projectId)) {
      await downloadDirs.createProjectDir(projectId);
    }
    const filePromises = [];
     // form
    const form = busBoy({ headers: req.headers });
    form.on("file", (...props) => handleFile(projectId, awaitingButtons, filePromises, ...props));
    form.on("error", (err) => {
      reject(err);
    });
    // finished processing but not downloading
    form.on("finish", async () => {
      await Promise.all(filePromises);
      resolve({
        totalCount: ongoingDataUpdate.buttonFiles.totalFilenames.length,
        startedCount: ongoingDataUpdate.buttonFiles.startedFilenames.length,
        successfulCount: ongoingDataUpdate.buttonFiles.successfulFilenames.length
      });
    });
     // pipe the request to the form handler
    req.pipe(form);
  });
};

module.exports = saveButtonFilesForm;
