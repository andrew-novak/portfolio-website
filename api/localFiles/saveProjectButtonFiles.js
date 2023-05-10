const path = require("path");
const fs = require("fs");

const Project = require("../models/Project");
const mediaDirs = require("./mediaDirs");

// VALIDATION

const findDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);
const intersect = (arr1, arr2) =>
  arr1.filter((element) => arr2.includes(element));

const areIndexesOk = (arr1, arr2) => {
  if (arr1?.length !== arr2?.length) return false;
  if (findDuplicates(arr1).length !== 0) return false;
  if (findDuplicates(arr2).length !== 0) return false;
  const intersection = intersect(arr1, arr2);
  if (intersection.length !== arr1.length) return false;
  return true;
};

const validate = async (projectId, files) => {
  const project = await Project.findOne({ id: projectId });
  const awaitingButtonIndexes = [];
  (project?.buttons || []).forEach((button, index) => {
    if (button.isAwaitingFileUpload) {
      awaitingButtonIndexes.push(index);
    }
  });
  if (awaitingButtonIndexes.length < 1) {
    throw new Error(
      `Project with id ${projectId} is not awaiting any button files`
    );
    //return res.status(400).json({ message: notAwaitingMessage });
  }
  const fileIndexes = files.map((file) => parseInt(file.filename));
  const areOk = areIndexesOk(fileIndexes, awaitingButtonIndexes);
  if (!areOk) throw new Error("Indexes failed validation");
  // no erors - validation successful
};

// ACTUAL FILE SAVE

const saveFiles = async (projectId, files) => {
  const promises = [];
  const createOnePromise = (file) =>
    new Promise((resolve, reject) => {
      const projectPath = mediaDirs.getProjectPath(projectId);
      // 'file.filename' should be an index
      const filename = `download-${file.filename}`;
      const filePath = path.join(projectPath, filename);
      if (fs.existsSync(filePath)) {
        throw new Error("A file with this name already exists");
      }
      fs.writeFile(filePath, file.fileBuffer, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  files.forEach((file) => promises.push(createOnePromise(file)));
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
