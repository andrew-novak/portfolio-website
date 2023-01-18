const yargsInteractive = require("yargs-interactive");

const Admin = require("../../models/Admin");

module.exports = () =>
  new Promise((resolve) =>
    yargsInteractive()
      .usage("$0 <command> [args]")
      .interactive({
        interactive: { default: true },
        email: {
          type: "input",
          describe: "Enter an email of admin that you want to remove",
        },
      })
      .then(async ({ email }) => {
        const admin = await Admin.deleteOne({ email });
        if (!admin.deletedCount) {
          console.log(`\nNo admin with email "${email}"\n`);
          return resolve();
        }
        console.log(`\nAdmin "${email}" removed.\n`);
        resolve();
      })
  );
