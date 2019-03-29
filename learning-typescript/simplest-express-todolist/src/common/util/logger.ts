import winston from "winston";
import { createLogger, format, transports } from "winston";
import { AbstractConfigSetLevels } from "winston/lib/winston/config";
import fs from "fs";
import path from "path";
import getNodeEnv from "./getNodeEnv";

const logDir = "./log";

if (!fs.existsSync(logDir)) // check if the directory exists in the root
  fs.mkdirSync(logDir); // if it doesn't, create it

const filename = path.join( logDir, "results.log" );

const options = {
  file: {
    level: "debug",
    filename: filename,
    maxsize: 10000000
  },
  console: {
    format: format.combine(
      format.colorize(),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    level:
      (getNodeEnv() === "production") ? "error" :
      (getNodeEnv() === "test") ? "test" :
      "debug" // "development" case
  },
};

const loggerColors = {
  debug: "green",
  info: "cyan",
  warn: "yellow",
  error: "red",
  test: "blue"
} // BTW, the default levels are in: winston.config.syslog.levels

const loggerLevels: AbstractConfigSetLevels = {
  debug: 4,
  info: 3,
  warning: 2,
  error: 1,
  test: 0 
};
// "test" is a "homebrew" level; it will be the only level we'll be using
// during tests.

// Format for stack tracing. The solution is taken from [1].
const errorStackTracerFormat = format(info => {
  if (info.meta && info.meta instanceof Error)
    info.message = `${info.message} ${info.meta.stack}`;

  return info;
});

const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json(),
    errorStackTracerFormat(),
  ),
  transports: [
    new transports.Console( options.console ),
    new transports.File( options.file )
  ],
  levels: loggerLevels
});

winston.addColors(loggerColors);
logger.debug("Logging initialized at debug level");

export default logger;
// [1]: https://stackoverflow.com/a/53231561/10874193