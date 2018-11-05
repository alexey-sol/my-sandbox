import mongoose from "mongoose";
import config from "../config";
import app from "./server";
import logger from "../util/logger";

const port: string = config.server.port || "8081",
      dbUrl: string = config.db.dbUrl;

app.listen(port, () => logger.info(`Connected to server on port ${port}.`));

const onSuccess = () => logger.info(`Connected to "${config.db.dbName}".`);
const onError = (error: Error) => {
  logger.error(`Error occured when connecting to DB: ${error.message}.`);
  process.exit(1);
};

const options: Object = {
  useNewUrlParser: true,
  useCreateIndex: true
};

mongoose.connect(dbUrl, options).then(
  onSuccess, onError
);

// https://code.tutsplus.com/ru/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527

// https://mongoosejs.com/docs/connections.html