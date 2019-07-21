import winston from "winston";
import { createLogger, format, transports } from "winston";
import { AbstractConfigSetLevels } from "winston/lib/winston/config";
import fs from "fs";
import path from "path";
import getNodeEnv from "./getNodeEnv";

const logDir = "./server/log";

if (!fs.existsSync(logDir)) // check if the directory exists in the root
  fs.mkdirSync(logDir); // if it doesn't, create it

const filename = path.join( logDir, "results.log" );

const options = {
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
  file: {
    filename,
    level: "debug",
    maxsize: 10000000
  }
};

const loggerColors = {
  debug: "green",
  error: "red",
  info: "cyan",
  test: "blue",
  warn: "yellow"
}; // BTW, the default levels are in: winston.config.syslog.levels

const loggerLevels: AbstractConfigSetLevels = {
  debug: 4,
  error: 1,
  info: 3,
  test: 0,
  warning: 2
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
    errorStackTracerFormat()
  ),
  levels: loggerLevels,
  transports: [
    new transports.Console( options.console ),
    new transports.File( options.file )
  ]
});

winston.addColors(loggerColors);
logger.debug("Logging initialized at debug level");

export default logger;
// [1]: https://stackoverflow.com/a/53231561/10874193