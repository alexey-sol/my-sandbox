import mongoose from "mongoose";

type ITaskModel = mongoose.Document & {
  _id: mongoose.Types.ObjectId,
  content: String,
  createdAt: Date,
  tagsList: Array<string>,
  title: String,
  updatedAt: Date
};

export default ITaskModel;