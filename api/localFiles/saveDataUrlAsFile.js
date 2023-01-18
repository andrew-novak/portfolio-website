const path = require("path");
const fs = require("fs");

const splitDataUrl = (dataUrl) => {
  const [former, data] = dataUrl.split(",");
  const [mimeType, encoding] = former.replace("data:", "").split(";");
  const [type, subtype] = mimeType.split("/");
  return { type, subtype, encoding, data };
};

const saveDataUrlAsFile = async (directory, filename, dataUrl) => {
  const { type, subtype: extension, encoding, data } = splitDataUrl(dataUrl);
  const buffer = Buffer.from(data, "base64");
  const fullFilename = `${filename}.${extension}`;
  const filePath = path.join(directory, fullFilename);
  await fs.promises.writeFile(filePath, buffer).catch((err) => {
    throw new Error(err);
  });
  return fullFilename;
};

module.exports = saveDataUrlAsFile;
