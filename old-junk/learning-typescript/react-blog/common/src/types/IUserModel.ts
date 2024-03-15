import mongoose from "mongoose";
import IUserProfile from "./IUserProfile";

// Describes Mongoos' model of "user": this is how a document from "users"
// collection must look like.
// It's used when, for example, we need to get a certain document from the DB.

type IUserModel = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date,
  profile: IUserProfile,
  provider: string,
  providerId: string,
  updatedAt: Date
};

export default IUserModel;