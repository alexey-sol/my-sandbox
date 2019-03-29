import mongoose from "mongoose";

export default interface IDbConnection {
  connect(): Promise<mongoose.Mongoose>;
  dropDb(callback: Function): void;
};