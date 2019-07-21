import mongoose from "mongoose";
import ICommentModel from "Types/ICommentModel";

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: [{
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  }],
  content: String,
  for: {
    ref: "Post",
    type: mongoose.Schema.Types.ObjectId
  }
}, { collection: "comments", timestamps: true });

const Comment = mongoose.model<ICommentModel>("Comment", commentSchema);

export default Comment;