const express = require("express");

const mediaDirs = require("../localFiles/mediaDirs");
const projectsRoute = require("./projects");
const adminRoutes = require("./admin");

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

router.use("/projects", projectsRoute);

router.use("/admin", adminRoutes);

module.exports = router;
