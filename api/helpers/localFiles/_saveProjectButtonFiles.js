const path = require("path");
const fs = require("fs");

const Project = require("../../models/Project");
const downloadDirs = require("./downloadDirs");
const logger = require("../../debug/logger");

// VALIDATION

const getAwaitingFilenames = async (project) => {
  const awaitingFilenames = [];
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

const validate = async (project, files) => {
  const awaitingFilenames = await getAwaitingFilenames(project);
  const uploadedFilenames = files.map((file) => file.filename);
  const areOk = areFilenamesOk(uploadedFilenames, awaitingFilenames);
  if (!areOk) throw new Error("Filenames failed validation");
  // no erors - validation successful
};

// ACTUAL FILE SAVE

const saveFile = (projectId, project, file) =>
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
    fs.writeFile(filePath, file.fileBuffer, async (err) => {
      if (err) {
        logger.error("fs.writeFile error:");
        logger.error(err);
        return reject(err);
      }
      const buttonIndex = project.buttons.findIndex(
        (button) => button.filename === file.filename
      );
      project.buttons[buttonIndex].isAwaitingFileUpload = false;
      await Project.updateOne({ id: projectId }, project);
      return resolve();
    });
  });

const saveFiles = async (projectId, project, files) => {
  const promises = [];
  files.forEach((file) => promises.push(saveFile(projectId, project, file)));
  await Promise.all(promises);
};

/*
ROOT FUNCTION
each file obj in files:
{
  fileBuffer,
  filename,
  mimeType,
  encoding,
}
*/
const saveProjectButtonFiles = async (projectId, project, files) => {
  await validate(project, files);
  await saveFiles(projectId, project, files);
};

module.exports = saveProjectButtonFiles;
