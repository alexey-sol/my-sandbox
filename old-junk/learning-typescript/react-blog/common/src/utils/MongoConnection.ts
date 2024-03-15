import mongoose from "mongoose";
import IDbConnection from "Types/IDbConnection";
import IDbConnectionOptions from "Types/IDbConnectionOptions";

export default class MongoConnection implements IDbConnection {
  constructor(
    private url: string,
    private options?: IDbConnectionOptions
  ) {
    this.url = url;
    this.options = options;
  }

  public connect(): Promise<mongoose.Mongoose> {
    return new Promise((resolve, reject) => {
      const options = this.options || {
        useCreateIndex: true,
        useNewUrlParser: true
      };

      const onSuccess = (): void => {
        mongoose.Promise = global.Promise; // turn on native promises mode
        resolve(connection);
      };

      const onError = (error: Error): void => {
        mongoose.connection.close();
        reject(error);
      };

      const connection = mongoose.connect(this.url, options);
      connection.then( onSuccess, onError );
    });
  }

  public dropDb(callback?: () => void) {
    mongoose.connection.dropDatabase((error: Error) => {
      if (error)
        throw error;

      if (callback)
        callback();
    });
  }
}