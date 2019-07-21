import IDataBaseConfig from "./IDataBaseConfig";
import IServerConfig from "./IServerConfig";

// Describes a config for the server (port) and the DB (name and URL).

export default interface IBackEndConfig {
  readonly server: IServerConfig;
  readonly db: IDataBaseConfig;
}