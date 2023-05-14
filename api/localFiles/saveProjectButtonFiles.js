const path = require("path");
const fs = require("fs");

const Project = require("../models/Project");
const downloadDirs = require("./downloadDirs");
const logger = require("../debug/logger");

// VALIDATION

const getAwaitingFilenames = async (projectId) => {
  const awaitingFilenames = [];
  const project = await Project.findOne({ id: projectId });
  (project?.buttons || []).forEach((button, index) => {
    if (button.isAwaitingFileUpload && button.filename) {
      awaitingFilenames.push(button.filename);
    }
  });
  return awaitingFilenames;
};
const findDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);
const intersect = (arr1, arr2) =>
  arr1.filter((element) => arr2.includes(element));

const areFilenamesOk = (arr1, arr2) => {
  if (arr1.length < 1) return false;
  if (arr1?.length !== arr2?.length) return false;
  if (findDuplicates(arr1).length !== 0) return false;
  if (findDuplicates(arr2).length !== 0) return false;
  const intersection = intersect(arr1, arr2);
  if (intersection.length !== arr1.length) return false;
  return true;
};

const validate = async (projectId, files) => {
  const awaitingFilenames = await getAwaitingFilenames(projectId);
  const uploadedFilenames = files.map((file) => file.filename);
  const areOk = areFilenamesOk(uploadedFilenames, awaitingFilenames);
  if (!areOk) throw new Error("Filenames failed validation");
  // no erors - validation successful
};

// ACTUAL FILE SAVE

const saveFiles = async (projectId, files) => {
  const promises = [];

  const saveFile = (file) =>
    new Promise(async (resolve, reject) => {
      const projectPath = downloadDirs.getProjectPath(projectId);
      const filePath = path.join(projectPath, file.filename);

      // 1. create project directory if none
      if (!downloadDirs.isThereProjectDir(projectId)) {
        await downloadDirs.createProjectDir(projectId);
      }

      // 2. check if file already exists
      if (fs.existsSync(filePath)) {
        logger.error("A file with this name already exists");
        return reject("A file with this name already exists");
      }

      // 3. create file
      fs.writeFile(filePath, file.fileBuffer, (err) => {
        if (err) {
          logger.error("fs.writeFile error:");
          logger.error(err);
          return reject(err);
        }
        return resolve();
      });
    });

  files.forEach((file) => promises.push(saveFile(file)));

  await Promise.all(promises);
};

/*
ROOT FUNCTION
'files' prop - array of object
one file obj in 'files' prop:
{
  fileBuffer,
  filename,
  mimeType,
  encoding,
}
*/
const saveProjectButtonFiles = async (projectId, files) => {
  await validate(projectId, files);
  await saveFiles(projectId, files);
};

module.exports = saveProjectButtonFiles;
