const express = require("express");
const passport = require("passport");
const { body, param } = require("express-validator");

const logger = require("../../debug/logger");
const { areButtonsOk, isButtonOk } = require("../../expressValidator/buttons");
const handleValidationErrors = require("../../expressValidator/handleValidationErrors");
// subroutes
const loginRoute = require("./login");
const setIntroRoute = require("./setIntro");
const createProjectRoute = require("./projects/create");
const editProjectRoute = require("./projects/edit");
const setButtonFilesRoute = require("./projects/setButtonFiles");
const getProjectRoute = require("./projects/getOne");
const removeProjectRoute = require("./projects/remove");

const router = express.Router();

// VALIDATION

const hexColorRegex = /^#[0-9A-F]{6}$/i;
// Base 64 Beginning Example:
// data:image/jpeg;base64,/9j/4AAQSkZJ
const base64Regex = /^data:.*\/.*;base64,([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const isHexColor = (value) => {
  return hexColorRegex.test(value);
};
const isBase64 = (value) => {
  return base64Regex.test(value);
};

// ROUTER METHODS

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

const sharedValidation = [
  body("colors").isArray(),
  body("colors.*").isString().custom(isHexColor),
  body("title").isString().isLength({ min: 1, max: 30 }),
  // TODO: improve descriptionList validation
  body("descriptionList").isArray(),
  body("mediaFilenames").isArray(),
  body("mediaFilenames.*").optional().isString().isLength({ min: 1, max: 50 }),
  body("mediaDataUrls").isArray(),
  body("mediaDataUrls.*")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .custom(isBase64),
  // filename + isAwaitingFileUpload: true = new file
  // filename + isAwaitingFileUpload: false = existing file
  // redirect is just redirect url
  // TODO: improve buttons validation
  body("buttons").isArray(),
  body("buttons.*").isObject(),
  body("buttons.*.icon").optional({ nullable: true }).isString(),
  body("buttons.*.label").isString(),
  body("buttons.*.behaviour").isString(),
  body("buttons.*.redirect").optional({ nullable: true }).isString(),
  body("buttons.*.filename").optional({ nullable: true }).isString(),
  body("buttons.*.isAwaitingFileUpload").isBoolean(),
  body("buttons").custom(areButtonsOk),
  body("buttons.*").custom(isButtonOk),
];

// Create project
router.post(
  "/projects",
  sharedValidation,
  handleValidationErrors,
  createProjectRoute
);

// Edit project
router.post(
  "/projects/:projectId",
  [body("position").notEmpty().isInt(), ...sharedValidation],
  handleValidationErrors,
  editProjectRoute
);

// Set project button files
router.post("/projects/:projectId/button-files", setButtonFilesRoute);

// Remove project
router.delete(
  "/projects/:projectId",
  [param("projectId").exists()],
  handleValidationErrors,
  removeProjectRoute
);

module.exports = router;
