import getNodeEnv from "./common/util/getNodeEnv";

// Is it a local development? Use .env, then. dotenv allows to add contents
// of .env file to process.env. In production, we will set environmental
// variables by means of the service we use (say, Heroku).

if (getNodeEnv() !== "production")
  require("dotenv").config({ silent: true });
  // "silent" option kills the error which occurs if there's no .env file.

else if (getNodeEnv() === null) {
  console.error("Please set NODE_ENV");
  process.exit(1);
}

require("./common/util/logger");
require("./app");