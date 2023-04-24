const express = require("express");
const passport = require("passport");
const { body, param } = require("express-validator");

const logger = require("../../debug/logger");
const handleValidationErrors = require("../../expressValidator/handleValidationErrors");
const loginRoute = require("./login");
const setIntroRoute = require("./setIntro");
const createProjectRoute = require("./projects/create");
const editProjectRoute = require("./projects/edit");
const getProjectRoute = require("./projects/getOne");
const removeProjectRoute = require("./projects/remove");

const router = express.Router();

const hexColorRegex = /^#[0-9A-F]{6}$/i;
const base64Regex = /^data:.*\/.*;base64,([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
/*
Base 64 Beginning Example:
data:image/jpeg;base64,/9j/4AAQSkZJ
*/

const isHexColor = (value) => {
  return hexColorRegex.test(value);
};
const isBase64 = (value) => {
  return base64Regex.test(value);
};

router.post(
  "/login",
  [body("email").isString(), body("password").isString()],
  handleValidationErrors,
  loginRoute
);

// authenticate all requests to "/admin" and its subroutes with password JWT strategy
router.use("/", (req, res, next) => {
  passport.authenticate("jwt", { session: "false" }, (err, admin) => {
    if (err) {
      logger.error(err);
      return res.status(500).json(null);
    }

    if (!admin) {
      logger.debug("failed admin auth: no valid id token");
      return res.status(401).json(null);
    }

    req.adminId = admin._id;
    next();
  })(req, res, next);
});

// if a request successfully has gone through the above middleware
// to finally access this one, it means that idToken is alright
router.post("/checkIdToken", (req, res, next) => {
  res.status(200).json({});
});

// Create or edit intro
router.post(
  "/intro",
  [
    body("text").isString().isLength({ min: 1, max: 400 }),
    body("imageFilename").optional().isString().isLength({ min: 1, max: 50 }),
    body("imageDataUrl")
      .optional()
      .isString()
      .isLength({ min: 1 })
      .custom(isBase64),
  ],
  handleValidationErrors,
  setIntroRoute
);

// Get one project
router.get(
  "/projects/:projectId",
  [param("projectId").exists()],
  handleValidationErrors,
  getProjectRoute
);

// Create project
router.post(
  "/projects",
  [
    body("colors").isArray(),
    body("colors.*").isString().custom(isHexColor),
    body("title").isString().isLength({ min: 1, max: 30 }),
    // TODO: improve descriptionList validation
    body("descriptionList").isArray(),
    body("mediaFilenames").isArray(),
    body("mediaFilenames.*")
      .optional()
      .isString()
      .isLength({ min: 1, max: 50 }),
    body("mediaDataUrls").isArray(),
    body("mediaDataUrls.*")
      .optional()
      .isString()
      .isLength({ min: 1 })
      .custom(isBase64),
  ],
  handleValidationErrors,
  createProjectRoute
);

// Edit project
router.post(
  "/projects/:projectId",
  [
    body("position").notEmpty().isInt(),
    body("title").isString().isLength({ min: 1, max: 30 }),
    // TODO: improve descriptionList validation
    body("descriptionList").isArray(),
  ],
  handleValidationErrors,
  editProjectRoute
);

// Remove project
router.delete(
  "/projects/:projectId",
  [param("projectId").exists()],
  handleValidationErrors,
  removeProjectRoute
);

module.exports = router;
