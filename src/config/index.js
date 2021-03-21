const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

module.exports = {
  appHost: process.env.APP_HOST,
  port: process.env.PORT,
  dbPort: process.env.DB_PORT,
  databaseName: process.env.DATABASE,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOSTNAME,
  JwtTokenSecret: require("crypto").randomBytes(64).toString("hex"),
  authTokenIssuer: process.env.AUTHENTICATION_TOKEN_ISSUER,
  healthCheckPath: process.env.HEALTHCHECK_PATH,
};
