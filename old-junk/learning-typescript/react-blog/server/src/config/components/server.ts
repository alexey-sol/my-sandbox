import Joi from "joi";
import getNodeEnv from "Utils/getNodeEnv";
import logger from "Utils/logger";
import IServerConfig from "Types/IServerConfig";

const envSchema = (getNodeEnv() === "test") ?
  Joi.object().keys({ PORT_TEST: Joi.number().required() }) :
  Joi.object().keys({ PORT: Joi.number().required() });

const { error, value: env } = Joi.validate(process.env, envSchema,
  { stripUnknown: true });

if (error)
  logger.error("Problem with server config!", error);

let port = "";

switch (getNodeEnv()) {
  case "production":
  case "development":
    port += env.PORT;
    break;

  case "test":
    port += env.PORT_TEST;
    break;
}

// There're different ports for "development" and "test", so there shouldn't
// be "listen EADDRINUSE" error due to an occupied port.

const serverConfig: IServerConfig = {
  port
};

export default serverConfig;