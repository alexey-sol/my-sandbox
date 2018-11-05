import Joi from "joi";
import logger from "../../util/logger";

// We'll use joi for validating values: PORT in our case. Using TS, I had to
// install TS' definitions library for joi: "npm install -D @types/joi". The
// documentation for joi can be found here: https://www.npmjs.com/package/joi

const envSchema = Joi.object().keys({ // creating scheme for joi
  PORT: Joi.number().required() // should be a number; it's a required parameter
});

const stripUnknownOption: { stripUnknown: boolean } = { stripUnknown: true };
// stripUnknown removes all the unknown keys from the object which is process.env.
// Without it, validate will loop through the whole process.env and will surely
// give out its fie.

const { error, value: env } = Joi.validate(process.env, envSchema, stripUnknownOption);
const port: string = String(env.PORT) || "";

if (error) {
  logger.error(
    `Error occured when validating environment variables related to server: 
    ${error.message}`
  ); 
  process.exit(1);
}

interface ServerConfig {
  readonly port: string;
}

const serverConfig: ServerConfig = {
  port: port
};

export default serverConfig;