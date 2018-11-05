import serverConfig from "./components/server";
import dbConfig from "./components/db";

interface Server {
  readonly port: string;
};

interface DataBase {
  readonly dbName: string;
  readonly dbUrl: string;
}

interface Config {
  readonly server: Server;
  readonly db: DataBase;
}

const config: Config = {
  server: { 
    port: serverConfig.port 
  },

  db: {
    dbName: dbConfig.dbName,
    dbUrl: dbConfig.dbUrl 
  }
};

export default config;