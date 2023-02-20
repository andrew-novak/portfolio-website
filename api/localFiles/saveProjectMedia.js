const mediaDirs = require("./mediaDirs");
const saveDataUrlAsFile = require("./saveDataUrlAsFile");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genFreeNoExtFilename = (takenFilenames, createdFilenames) => {
  const randomFilename = () => {
    const randomId = () => getRandomInt(0, 100);
    const filename = `media_${randomId()}`;
    return filename;
  };
  let filename = randomFilename();
  while (
    takenFilenames.includes(filename) ||
    createdFilenames.includes(filename)
  ) {
    filename = randomFilename();
  }
  return filename;
};

// createdFilenames should be an empty array at this point
const parallelySaveMedia = async (
  takenFilenames,
  createdFilenames,
  projectId,
  dataUrls
) => {
  const projDir = mediaDirs.getProjectPath(projectId);
  // Extensions are ignored when getting a free filename
  const removeExtensions = (filenames) =>
    filenames.map((filename) =>
      !filename ? null : filename.replace(/\.[^/.]+$/, "")
    );
  const noExtTakenFilenames = removeExtensions(takenFilenames);
  const noExtCreatedFilenames = removeExtensions(createdFilenames);
  // running this promise parallely for each data url
  const saveSingleFile = async (dataUrl, index) => {
    // still fill createdFilenames even when dataUrl is null
    if (dataUrl === null) return (createdFilenames[index] = null);
    const noExtFilename = genFreeNoExtFilename(
      noExtTakenFilenames,
      noExtCreatedFilenames
    );
    const filename = await saveDataUrlAsFile(projDir, noExtFilename, dataUrl);
    createdFilenames[index] = filename;
  };
  await Promise.all(dataUrls.map(saveSingleFile));
};

// parallely saves media data urls as files,
// revokes any changes in case of an error
// and returns media filenames
const saveProjectMedia = async (takenFilenames, projectId, dataUrls) => {
  let projectDirJustCreated = false;
  const createdFilenames = [];
  try {
    // create project directory if none
    if (!mediaDirs.isThereProjectDir(projectId)) {
      await mediaDirs.createProjectDir(projectId);
      projectDirJustCreated = true;
    }
    // create files
    await parallelySaveMedia(
      takenFilenames,
      createdFilenames,
      projectId,
      dataUrls
      //savedFilenames
    );
    // media filenames returned, so they can be saved in project database documents
    return createdFilenames;
  } catch (err) {
    if (projectDirJustCreated) {
      // remove the project directory only if it has been created in this call,
      // otherwise don't do anything in case there is already a directory
      mediaDirs.removeProjectDir(projectId);
    }
    // remove only added media
    else {
      mediaDirs.removeMediaFiles(projectId, createdFilenames);
    }
    throw err;
  }
};

module.exports = saveProjectMedia;
