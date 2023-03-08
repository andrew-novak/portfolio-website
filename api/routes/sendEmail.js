const { emailTransporter, emailFrom } = require("../config/emailTransporter");

const OWNER_EMAIL = process.env.ANOVAK_SITE_OWNER_EMAIL;

const sendEmailRoute = (req, res, next) => {
  const { clientEmail, message } = req.body;
  console.log("SEND EMAIL", clientEmail, message);
  const msg = `${clientEmail}:<br>${message}`;
  const emailOptions = {
    from: emailFrom,
    to: OWNER_EMAIL,
    subject: "New Email Form Message",
    text: msg,
    html: `<b>${msg}</b>`,
  };
  emailTransporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    return console.log(info);
  });
};

module.exports = sendEmailRoute;
