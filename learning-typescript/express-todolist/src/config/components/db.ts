import Joi from "joi";
import dbNameProduction from "./dbNameProduction.json";
import dbNameDevelopment from "./dbNameDevelopment.json";
import logger from "../../util/logger";

const dbParamsCheck = Joi.string().required();
const stripUnknownOption: { stripUnknown: boolean } = { stripUnknown: true };

const envSchema = Joi.object().keys({
  NODE_ENV: dbParamsCheck,
  DB_URL_PRODUCTION: dbParamsCheck,
  DB_URL_DEVELOPMENT: dbParamsCheck
});

const { error, value: env } = Joi.validate(process.env, envSchema, stripUnknownOption);
const nodeEnv: string = (env.NODE_ENV || "").trim(),
      dbUrlProduction: string = env.DB_URL_PRODUCTION || "",
      dbUrlDevelopment: string = env.DB_URL_DEVELOPMENT || "";
      // joi won't pass undefined values or even empty strings. These assignments for
      // TS only.

if (error) {
  logger.error(
    `Error occured when validating environment variables related to DB: 
    ${error.message}`
  );
  process.exit(1);
}

let dbName: string = "",
    dbUrl: string = "";

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
} // dbUrl: "mongodb://username:password@domain:port/" + "dbName"

interface DbConfig {
  readonly dbName: string; 
  readonly dbUrl: string;
}

const dbConfig: DbConfig = {
  dbName: dbName,
  dbUrl: dbUrl
};

export default dbConfig;