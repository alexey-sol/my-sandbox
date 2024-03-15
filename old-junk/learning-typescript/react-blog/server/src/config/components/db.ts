import Joi from "joi";
import dbNameDevelopment from "./dbNameDevelopment.json";
import dbNameProduction from "./dbNameProduction.json";
import getNodeEnv from "Utils/getNodeEnv";
import logger from "Utils/logger";
import IDataBaseConfig from "Types/IDataBaseConfig";

const envSchema = Joi.object().keys({
  DB_URL_DEVELOPMENT: Joi.string().required(),
  DB_URL_PRODUCTION: Joi.string().required()
});

const { error, value: env } = Joi.validate(process.env, envSchema,
  { stripUnknown: true });

const nodeEnv = getNodeEnv();
const dbUrlProduction = env.DB_URL_PRODUCTION || "";
const dbUrlDevelopment = env.DB_URL_DEVELOPMENT || "";

if (error)
  logger.error("Problem with DB config!", error);

let dbName = "";
let dbUrl = "";

switch (nodeEnv) {
  case "production":
    dbName += dbNameProduction.dbName;
    dbUrl += dbUrlProduction + dbName;
    break;

  case "development":
  case "test":
    dbName += dbNameDevelopment.dbName;
    dbUrl += dbUrlDevelopment + dbName;
    break;
}

const dbConfig: IDataBaseConfig = {
  dbName, dbUrl
};

export default dbConfig;