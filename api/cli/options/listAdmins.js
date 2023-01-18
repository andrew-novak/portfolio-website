const Admin = require("../../models/Admin");

module.exports = () =>
  new Promise((resolve) => {
    Admin.find({}, (err, admins) => {
      if (admins.length < 1) {
        console.log("\nNo admins in database\n");
        return resolve();
      }
      console.log();
      for (let i = 0; i < admins.length; i++) {
        const { email, _id } = admins[i];
        console.log(`email  : ${email}`);
        console.log(`_id    : ${_id}`);
        console.log();
      }
      resolve();
    });
  });
