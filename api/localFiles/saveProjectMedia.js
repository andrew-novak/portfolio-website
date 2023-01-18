const mediaDirs = require("./mediaDirs");
const saveDataUrlAsFile = require("./saveDataUrlAsFile");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genFreeMediaId = (mediaIds) => {
  const randomId = () => getRandomInt(0, 100);
  let id = randomId();
  while (mediaIds.includes(id)) {
    id = randomId();
  }
  return id;
};

const parallelySaveMedia = async (projectId, dataUrls /*savedFilenames*/) => {
  const projDir = mediaDirs.getProjectPath(projectId);
  const mediaIds = [];
  // running this promise parallely for each data url
  const saveSingleFile = async (dataUrl, index) => {
    const mediaId = genFreeMediaId(mediaIds);
    const filename = `media_${mediaId}`;
    const fullFilename = await saveDataUrlAsFile(projDir, filename, dataUrl);
    //savedFilenames[index] = fullFilename;
    return fullFilename;
  };
  const filenames = await Promise.all(dataUrls.map(saveSingleFile));
  return filenames;
};

// parallely saves media data urls as files,
// revokes any changes in case of an error
// and returns media filenames
const saveProjectMedia = async (projectId, dataUrls) => {
  let projectDirCreated = false;
  try {
    // create project directory
    try {
      await mediaDirs.createProjectDir(projectId);
    } catch (err) {
      throw err;
    }
    projectDirCreated = true;
    // create files
    const filenames = await parallelySaveMedia(
      projectId,
      dataUrls
      //savedFilenames
    );
    // media filenames returned, so they can be saved in project database documents
    return filenames;
  } catch (err) {
    if (projectDirCreated) {
      // remove the project directory only if it has been created,
      // otherwise don't do anything in case there is already a directory
      mediaDirs.removeProjectDir(projectId);
    }
    throw err;
  }
};

module.exports = saveProjectMedia;
