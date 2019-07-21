require("module-alias/register"); // attach aliases like "Utils"
import getNodeEnv from "Utils/getNodeEnv";
import logger from "Utils/logger";

switch (getNodeEnv()) {
  case null:
    logger.error("Please set NODE_ENV");
    process.exit(1);

  case "production":
    require("dotenv").config({ silent: true });
    break;
}

require("./app");