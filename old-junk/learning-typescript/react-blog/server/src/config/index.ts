import dbConfig from "./components/db";
import serverConfig from "./components/server";
import IBackEndConfig from "Types/IBackEndConfig";

const config: IBackEndConfig = {
  server: {
    port: serverConfig.port
  },

  db: {
    dbName: dbConfig.dbName,
    dbUrl: dbConfig.dbUrl
  }
};

export default config;