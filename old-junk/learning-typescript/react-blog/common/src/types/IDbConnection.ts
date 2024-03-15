import mongoose from "mongoose";

// Describes an object performing connection to DB.

export default interface IDbConnection {
  connect(): Promise<mongoose.Mongoose>;
  dropDb(callback: () => void): void;
}