import Joi from "joi";
import IValidNodeEnv from "Types/IValidNodeEnv";

type IGetNodeEnv = () => IValidNodeEnv | null;

let getNodeEnv: IGetNodeEnv;

// Returns the value of the present Node's environment which may be
// "development" | "production" | "test".
// If the value itself doesn't correspond to one of the listed above,
// returns null.

getNodeEnv = function(): IValidNodeEnv | null {
  const envSchema = Joi.object().keys({
    NODE_ENV: Joi.string().required().trim().valid(
      "development",
      "production",
      "test"
    )
  });

  const { error, value: env } = Joi.validate(process.env, envSchema,
    { stripUnknown: true });

  const nodeEnv = env.NODE_ENV as IValidNodeEnv;

  return (error) ?
    null :
    nodeEnv;
};

export default getNodeEnv;