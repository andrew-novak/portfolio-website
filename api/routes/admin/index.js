const express = require("express");
const passport = require("passport");
const { body, param } = require("express-validator");

const logger = require("../../debug/logger");
const handleValidationErrors = require("../../expressValidator/handleValidationErrors");
const loginRoute = require("./login");
const createProjectRoute = require("./projects/create");
const editProjectRoute = require("./projects/edit");
const removeProjectRoute = require("./projects/remove");

const router = express.Router();

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

router.post(
  "/projects",
  [
    body("title").isString().isLength({ min: 1, max: 30 }),
    body("description").isString().isLength({ min: 1, max: 3000 }),
    body("mediaDataUrls").isArray(),
    body("mediaDataUrls.*").isString().isLength({ min: 1 }),
  ],
  handleValidationErrors,
  createProjectRoute
);

router.post(
  "/projects/:projectId",
  [
    body("title").isString().isLength({ min: 1, max: 30 }),
    body("description").isString().isLength({ min: 1, max: 3000 }),
  ],
  handleValidationErrors,
  editProjectRoute
);

router.delete(
  "/projects/:projectId",
  [param("projectId").exists()],
  handleValidationErrors,
  removeProjectRoute
);

module.exports = router;
