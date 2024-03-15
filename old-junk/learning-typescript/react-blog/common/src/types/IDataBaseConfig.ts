// Describes DB config. It's a part of "IBackendConfig".

export default interface IDataBaseConfig {
  readonly dbName: string;
  readonly dbUrl: string;
}