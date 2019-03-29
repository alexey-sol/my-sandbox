import serverConfig from "./components/server";
import dbConfig from "./components/db";
import IBackEndConfig from "../common/types/IBackEndConfig";

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