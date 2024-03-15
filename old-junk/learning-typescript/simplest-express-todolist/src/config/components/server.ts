import Joi from "joi";
import getNodeEnv from "../../common/util/getNodeEnv";
import logger from "../../common/util/logger";
import IServerConfig from "../../common/types/IServerConfig";

const envSchema = Joi.object().keys({
  PORT: Joi.number().required(),
  PORT_TEST: Joi.number().required()
});

const { error, value: env } = Joi.validate(process.env, envSchema,
  { stripUnknown: true });

// "stripUnknown" removes all the unknown keys from the object which is
// "process.env" in the given case.

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
  port: port
};

export default serverConfig;