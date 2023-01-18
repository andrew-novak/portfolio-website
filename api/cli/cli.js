const mongoose = require("mongoose");
const fs = require("fs");
const yargsInteractive = require("yargs-interactive");

const checkEnvVars = require("../beforeRun/checkEnvVars");
const listAdmins = require("./options/listAdmins");
const addAdmin = require("./options/addAdmin");
const removeAdmin = require("./options/removeAdmin");

const MONGO_URL = process.env.ANOVAK_SITE_MONGO_URL;

checkEnvVars();

mongoose.connect(MONGO_URL);

(async () => {
  while (1) {
    await yargsInteractive()
      .usage("$0 <command> [args]")
      .interactive({
        interactive: { default: true },
        option: {
          type: "list",
          choices: ["List admins", "Add admin", "Remove admin", "Quit"],
          describe: "What would you like to do",
        },
      })
      .then(async ({ option }) => {
        if (option === "List admins") await listAdmins();
        if (option === "Add admin") await addAdmin();
        if (option === "Remove admin") await removeAdmin();
        if (option === "Quit") {
          console.log("bye");
          process.exit();
        }
      });
  }
})();
