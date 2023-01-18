const yargsInteractive = require("yargs-interactive");
const bcrypt = require("bcrypt");

const Admin = require("../../models/Admin");

const validate = (email, password) => {
  if (!email) return "No admin email provided";
  if (!password) return "No admin password provided";
  return;
};

module.exports = () =>
  new Promise((resolve) =>
    yargsInteractive()
      .usage("$0 <command> [args]")
      .interactive({
        interactive: { default: true },
        email: {
          type: "input",
          describe: "Enter an email",
        },
        password: {
          type: "password",
          describe: "Enter a password",
        },
      })
      .then(({ email, password }) => {
        const error = validate(email, password);
        if (error) {
          console.log(`\n${error}\n`);
          return resolve();
        }
        Admin.findOne({ email }, (err, admin) => {
          if (err) throw err;
          if (admin) {
            console.log("\nThis email is already taken\n");
            resolve();
          }
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, passwordHash) => {
              if (err) throw err;
              Admin.create({ email, passwordHash }, (err, admin) => {
                if (err) throw err;
                console.log(`\nThe admin "${email}" has been added\n`);
                resolve();
              });
            });
          });
        });
      })
  );
