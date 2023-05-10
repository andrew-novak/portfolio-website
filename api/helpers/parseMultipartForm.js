const busBoy = require("busboy");

const parseMultipartForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = busBoy({ headers: req.headers });
    const files = []; // create an empty array to hold the processed files
    const buffers = {}; // create an empty object to contain the buffers
    form.on("file", (field, file, { filename, encoding, mimeType }) => {
      buffers[field] = []; // add a new key to the buffers object
      file.on("data", (data) => {
        buffers[field].push(data);
      });
      file.on("end", () => {
        files.push({
          fileBuffer: Buffer.concat(buffers[field]),
          filename,
          mimeType,
          encoding,
        });
      });
    });
    form.on("error", (err) => {
      reject(err);
    });
    form.on("finish", () => {
      resolve(files);
    });
    req.pipe(form); // pipe the request to the form handler
  });
};

module.exports = parseMultipartForm;
