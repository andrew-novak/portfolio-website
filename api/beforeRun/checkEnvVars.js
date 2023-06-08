// Development And Production Environment Variables
const envKeys = [
  "ANOVAK_SITE_MONGO_URL",
  "ANOVAK_SITE_API_PORT",
  "ANOVAK_SITE_ADMIN_JWT_SECRET",
  "ANOVAK_SITE_ROBOT_EMAIL_HOST",
  "ANOVAK_SITE_ROBOT_EMAIL_NAME",
  "ANOVAK_SITE_ROBOT_EMAIL_USERNAME",
  "ANOVAK_SITE_ROBOT_EMAIL_PASSWORD",
  "ANOVAK_SITE_OWNER_EMAIL",
];

// Production-Only Environemnt Variables
const prodEnvKeys = ["ANOVAK_SITE_PROD_STATIC"];

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
