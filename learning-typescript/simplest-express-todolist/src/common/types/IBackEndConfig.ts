import IServerConfig from "./IServerConfig";
import IDataBaseConfig from "./IDataBaseConfig";

export default interface IBackEndConfig {
  readonly server: IServerConfig;
  readonly db: IDataBaseConfig;
};