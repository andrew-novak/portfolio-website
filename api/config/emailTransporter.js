const nodemailer = require("nodemailer");

const EMAIL_HOST = process.env.ANOVAK_SITE_ROBOT_EMAIL_HOST;
const EMAIL_NAME = process.env.ANOVAK_SITE_ROBOT_EMAIL_NAME;
const EMAIL_USERNAME = process.env.ANOVAK_SITE_ROBOT_EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.ANOVAK_SITE_ROBOT_EMAIL_PASSWORD;

const emailTransporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 25,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const emailFrom = `${EMAIL_NAME} <${EMAIL_USERNAME}@${EMAIL_HOST}>`;

module.exports = { emailTransporter, emailFrom };
