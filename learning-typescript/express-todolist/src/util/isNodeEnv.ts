import Joi from "joi";

let isNodeEnv: (compare: string) => boolean =
  // If compare corresponds to the value of Node's environment, which may be 
  // "production" | "development" | "test", returns true. Otherwise returns false.
  function(compare: string): boolean {
    const stripUnknownOption: { stripUnknown: boolean } = { stripUnknown: true };

    const envSchema = Joi.object().keys({
      NODE_ENV: Joi.string().required()
    });

    const { error, value: env } = Joi.validate(process.env, envSchema, stripUnknownOption);
    const nodeEnv: string = (env.NODE_ENV || "").trim();

    return (!error && compare === nodeEnv) ? 
      true : false;    
  };

export default isNodeEnv;