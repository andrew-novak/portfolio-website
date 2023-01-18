const express = require("express");
const { param } = require("express-validator");

const handleValidationErrors = require("../../expressValidator/handleValidationErrors");
const getProjectsRoute = require("./getMany.js");
const getProjectRoute = require("./getOne.js");

const router = express.Router();

router.get("/", getProjectsRoute);

router.get(
  "/:projectId",
  [param("projectId").exists()],
  handleValidationErrors,
  getProjectRoute
);

module.exports = router;
