import Joi from "joi";
import dbNameProduction from "./dbNameProduction.json";
import dbNameDevelopment from "./dbNameDevelopment.json";
import getNodeEnv from "../../common/util/getNodeEnv";
import logger from "../../common/util/logger";
import IDataBaseConfig from "../../common/types/IDataBaseConfig";

const envSchema = Joi.object().keys({
  DB_URL_PRODUCTION: Joi.string().required(),
  DB_URL_DEVELOPMENT: Joi.string().required()
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
  dbName: dbName,
  dbUrl: dbUrl
};

export default dbConfig;