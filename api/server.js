const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const checkEnvVars = require("./beforeRun/checkEnvVars");
const logger = require("./debug/logger");
const configPassport = require("./config/passport");
const mediaDirs = require("./localFiles/mediaDirs");
const rootRouter = require("./routes");

checkEnvVars();
if (
  process.env.NODE_ENV != "development" &&
  process.env.NODE_ENV != "production"
) {
  process.env.NODE_ENV = "development";
}
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URL = process.env.ANOVAK_SITE_MONGO_URL;
const PORT = process.env.ANOVAK_SITE_API_PORT;
const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "1000mb" }));

configPassport(passport);
app.use(passport.initialize());

mediaDirs.createNeccessaryDirs();

mongoose
  .connect(MONGO_URL)
  .then(() => logger.info(`connected to the MongoDB ${MONGO_URL}`))
  .catch((err) =>
    logger.error(
      `error occurred during connecting to MongoDB ${MONGO_URL}:\n` + err
    )
  );

app.use((req, res, next) => {
  logger.debug(`got request: ${req.method} ${req.url}`);
  next();
});

app.use("/", rootRouter);

app.listen(PORT, () => logger.info(`server started on port: ${PORT}`));

module.exports = app;
