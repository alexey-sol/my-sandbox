import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";
import isNodeEnv from "./isNodeEnv";

const logDir: string = "log";

if (!fs.existsSync( logDir )) // check if the directory exists in the root
  fs.mkdirSync( logDir ); // if it doesn't, create it, then

const filename: string = path.join( logDir, "debug.log" );

interface LoggerOptions { // it's a pretty rough interface, I admit that
  readonly file?: Object;
  readonly console?: Object;
  readonly HTTP?: Object;
}

const options: LoggerOptions = {
  file: {
    level: "debug",
    filename: filename
  },
  console: {
    format: format.combine(
      format.colorize(),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    level: isNodeEnv( "production" ) ? "error" : "debug"
  },
};

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.Console( options.console ),
    new transports.File( options.file )
  ]
});

if (!isNodeEnv( "production" )) // everything except "production"
  logger.debug("Logging initialized at debug level.");

export default logger;

// These 2 articles helped me a lot in this regard:
// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
// https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/