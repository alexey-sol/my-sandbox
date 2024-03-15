require("module-alias/register");
const getNodeEnv = require("Common/utils/getNodeEnv");

// First let's make sure that there's a valid "NODE_ENV".
switch (getNodeEnv()) {
  case null:
    console.error("Please set NODE_ENV");
    process.exit(1);

  case "development":
  case "production":
    require("dotenv").config({ silent: true });
    break;
}

require("./app"); // is everything fine? Then run the server