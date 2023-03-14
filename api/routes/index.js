const express = require("express");
const { body, param } = require("express-validator");

const handleValidationErrors = require("../expressValidator/handleValidationErrors");
// subroutes
const mediaDirs = require("../localFiles/mediaDirs");
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

// serve development media
if (NODE_ENV === "development") {
  const mediaRoot = mediaDirs.getRootPath();
  router.use("/media", require("serve-index")(mediaRoot));
  router.use("/media", express.static(mediaRoot));
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
