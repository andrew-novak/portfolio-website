const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
const PROD_STATIC = process.env.ANOVAK_SITE_PROD_STATIC;

const staticFilesRoot =
  NODE_ENV === "production" ? PROD_STATIC : path.join(__dirname, "../devFiles");

module.exports = { staticFilesRoot };
