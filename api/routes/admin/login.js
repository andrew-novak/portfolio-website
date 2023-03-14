const passport = require("passport");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.ANOVAK_SITE_ADMIN_JWT_SECRET;
const utf8Chars = require("../../constants/utf8Chars");
const logger = require("../../debug/logger");

// server-side logs
const logAuthFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} passport.authenticate error during admin login attempt:`
  );
  logger.error(err);
};
const logLoginFailure = (err) => {
  logger.error(
    `${utf8Chars.xMark} passport.authenticate's req.login error during admin login attempt:`
  );
  logger.error(err);
};
const logAdminNotFound = () =>
  logger.debug(
    `${utf8Chars.xMark} failed admin login: admin with given credentials not found`
  );
const logAdminFound = () =>
  logger.debug(
    `${utf8Chars.checkMark} admin with given credentials found, logging in...`
  );
const logAdminLoggedIn = () =>
  logger.debug(
    `${utf8Chars.checkMark} admin successfully logged in, sending token id to the client...`
  );

const loginRoute = (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) {
      logAuthFailure(err);
      return res.status(500).json(null);
    }

    if (!admin) {
      logAdminNotFound();
      return res.status(400).json(null);
    }
    logAdminFound();

    req.login(admin, (err) => {
      if (err) {
        logLoginFailure(err);
        return res.status(500).json(null);
      }

      const idToken = jwt.sign({ adminId: admin._id }, JWT_SECRET);
      logAdminLoggedIn();
      res.status(200).json({ idToken });
    });
  })(req, res, next);
};

module.exports = loginRoute;
