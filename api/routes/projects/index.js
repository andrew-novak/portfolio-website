const express = require("express");
const { param } = require("express-validator");

const handleValidationErrors = require("../../expressValidator/handleValidationErrors");
const getProjectsRoute = require("./getMany.js");
const getProjectRoute = require("./getOne.js");
//const getButtonFileRoute = require("./getButtonFile");

const router = express.Router();

router.get("/", getProjectsRoute);

router.get(
  "/:projectId",
  [param("projectId").exists()],
  handleValidationErrors,
  getProjectRoute
);

/*
router.get(
  "/:projectId/button-files/:filename",
  [param("projectId").exists()],
  [param("filename").exists()],
  handleValidationErrors,
  getButtonFileRoute
);
*/

module.exports = router;
