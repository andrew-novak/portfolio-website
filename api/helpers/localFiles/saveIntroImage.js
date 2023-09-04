const saveDataUrlAsFile = require("./saveDataUrlAsFile");
const mediaDirs = require("./mediaDirs");

const removeExtension = (filename) => {
  if (!filename) return null;
  const noExtFilename = filename.replace(/\.[^/.]+$/, "");
  return noExtFilename;
};

const saveIntroImage = async (dataUrl) => {
  let filename;
  try {
    const noExtFilename = "intro";
    filename = await saveDataUrlAsFile(
      mediaDirs.getRootPath(),
      noExtFilename,
      dataUrl
    );
    return filename;
  } catch (err) {
    // remove added image
    filename && mediaDirs.removeIntroImage(filename);
    throw err;
  }
};

module.exports = saveIntroImage;
