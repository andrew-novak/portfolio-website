const logger = require("../debug/logger");
const utf8Chars = require("../constants/utf8Chars");
const { emailTransporter, emailFrom } = require("../config/emailTransporter");

const OWNER_EMAIL = process.env.ANOVAK_SITE_OWNER_EMAIL;

// server-side logs
const logFailure = (err) => {
  logger.error(`${utf8Chars.xMark} error during email sending:`);
  logger.error(err);
};
// client-side messages
const messageFailure = "Failed to send the email";

const sendEmailRoute = (req, res, next) => {
  const { clientEmail, message } = req.body;

  const text = `Client Email:<br><br>${clientEmail}<br><br>Message:<br><br>${message}`;
  const html = `<h3>Client Email:</h3><p>${clientEmail}<p><h3>Message:</h3><p>${message}</p>`;

  const emailOptions = {
    from: emailFrom,
    to: OWNER_EMAIL,
    subject: "New Email Form Message",
    text,
    html,
  };

  emailTransporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      logFailure(err);
      return res.status(500).json({ message: messageFailure });
    }
    return res.status(200).json({});
  });
};

module.exports = sendEmailRoute;
