const Joi = require("joi");

// Returns the value of the present Node's environment which may be:
// "development" | "production" | "test".
// If the value itself doesn't correspond to any of the listed above,
// returns null.

module.exports = function() {
  const envSchema = Joi.object().keys({
    NODE_ENV: Joi.string().required().trim().valid(
      "development",
      "production",
      "test"
    )
  });

  const { error, value: env } = Joi.validate(
    process.env,
    envSchema,
    { stripUnknown: true }
  );

  return (error)
    ? null
    : env.NODE_ENV;
};