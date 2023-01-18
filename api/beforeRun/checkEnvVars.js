const envKeys = [
  "ANOVAK_SITE_MONGO_URL",
  "ANOVAK_SITE_API_PORT",
  "ANOVAK_SITE_ADMIN_JWT_SECRET",
];
const prodEnvKeys = ["ANOVAK_SITE_PROD_MEDIA"];

const checkEnv = (keys) => {
  for (key of keys) {
    if (!process.env.hasOwnProperty(key)) {
      throw new Error(`Environemnt variable ${key} not found.`);
    }
  }
};

const checkEnvVars = () => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV !== "development" && NODE_ENV !== "production")
    throw new Error(
      `Environment variable NODE_ENV must be set to either "development or "production".`
    );
  checkEnv(envKeys);
  if (NODE_ENV === "production") {
    checkEnv(prodEnvKeys);
  }
};

module.exports = checkEnvVars;
