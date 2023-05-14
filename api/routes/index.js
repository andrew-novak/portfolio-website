const express = require("express");
const { body, param } = require("express-validator");
const contentDisposition = require("content-disposition");

const mediaDirs = require("../localFiles/mediaDirs");
const downloadDirs = require("../localFiles/downloadDirs");
const handleValidationErrors = require("../expressValidator/handleValidationErrors");
// subroutes
const getIntroRoute = require("./getIntro");
const projectsRoute = require("./projects");
const sendEmailRoute = require("./sendEmail");
const adminRoute = require("./admin");

const NODE_ENV = process.env.NODE_ENV;
const router = express.Router();

// for all routes
router.options("/*", (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

// serve media and download files
if (NODE_ENV === "development") {
  // media
  const mediaRoot = mediaDirs.getRootPath();
  router.use("/media", require("serve-index")(mediaRoot));
  router.use("/media", express.static(mediaRoot));
  // download
  const downloadRoot = downloadDirs.getRootPath();
  const setHeaders = (res, path) => {
    res.setHeader("Content-Disposition", contentDisposition(path));
  };
  router.use("/download", express.static(downloadRoot, { setHeaders }));
}

router.get("/intro", getIntroRoute);

router.use("/projects", projectsRoute);

router.post(
  "/sendEmail",
  [
    body("clientEmail").isString().isEmail().isLength({ min: 1, max: 100 }),
    body("message").isString().isLength({ min: 1, max: 1000 }),
  ],
  handleValidationErrors,
  sendEmailRoute
);

router.use("/admin", adminRoute);

module.exports = router;
