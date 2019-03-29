import mongoose from "mongoose";
import ITaskModel from "../types/ITaskModel";

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  tagsList: Array,
  title: {
    type: String,
    required: true
  }
}, { collection: "tasks", timestamps: true });
// According to the documenation, Mongoose sets the collection name by itself,
// but let's define it explicitly.

const Task = mongoose.model<ITaskModel>("Task", taskSchema);

export default Task;