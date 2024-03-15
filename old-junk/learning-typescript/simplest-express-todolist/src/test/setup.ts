require("dotenv").config({ silent: true });
import app from "../app/server";
import config from "../config";
import chai from "chai";
import chaiHttp from "chai-http";
import MongoConnection from "../common/util/MongoConnection";

chai.use(chaiHttp);

const port = config.server.port || "8082";
const dbUrl = config.db.dbUrl;

const server = app.get("_server");
const mongoConnection = new MongoConnection(dbUrl);

before(async () => {
  try {
    server.listen(port);
    await mongoConnection.connect();

  } catch(error) {
    server.close();
  }
});

after(async () => {
  mongoConnection.dropDb(); // clean up before quitting
  server.close();
});

beforeEach(done => mongoConnection.dropDb(done));