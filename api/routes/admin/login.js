const passport = require("passport");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.ANOVAK_SITE_ADMIN_JWT_SECRET;
const utf8Chars = require("../../constants/utf8Chars");
const logger = require("../../debug/logger");

// server-side logs
const authenticateFailureLog = (err) =>
  logger.debug(
    `${
      utf8Chars.xMark
    } passport.authenticate error during admin login attempt:\n${JSON.stringify(
      err
    )}`
  );
const loginFailureLog = (err) =>
  logger.debug(
    `${
      utf8Chars.xMark
    } passport.authenticate's req.login error during admin login attempt:\n${JSON.stringify(
      err
    )}`
  );
const adminNotFoundLog = () =>
  logger.debug(
    `${utf8Chars.xMark} failed admin login: admin with given credentials not found`
  );
const adminFoundLog = () =>
  logger.debug(
    `${utf8Chars.checkMark} admin with given credentials found, logging in...`
  );
const adminLoggedInLog = () =>
  logger.debug(
    `${utf8Chars.checkMark} admin successfully logged in, sending token id to the client...`
  );

const loginRoute = (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) {
      failureLog(err);
      return res.status(500).json(null);
    }

    if (!admin) {
      adminNotFoundLog();
      return res.status(400).json(null);
    }

    adminFoundLog();
    req.login(admin, (err) => {
      if (err) {
        logger.error(err);
        return res.status(500).json(null);
      }

      const idToken = jwt.sign({ adminId: admin._id }, JWT_SECRET);
      adminLoggedInLog();
      res.status(200).json({ idToken });
    });
  })(req, res, next);
};

module.exports = loginRoute;
