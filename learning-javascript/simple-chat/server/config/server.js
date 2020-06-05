const Joi = require("joi");
const getNodeEnv = require("Common/utils/getNodeEnv");

const envSchema = Joi.object().keys({
  PORT: Joi.number().required()
});

const { error, value: env } = Joi.validate(
  process.env,
  envSchema,
  { stripUnknown: true }
);

if (error) {
  console.error(error);
  process.exit(1);
}

let port = "";

switch (getNodeEnv()) {
  case "production":
  case "development":
    port += env.PORT;
    break;
}

module.exports = { port };