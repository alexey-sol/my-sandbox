import mongoose from "mongoose";

// Describes Mongoos' model of "comment": this is how a document from "comments"
// collection must look like.
// It's used when, for example, we need to get a certain document from the DB.

type ICommentModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  content: string,
  createdAt: Date,
  for: {
    ref: "Post",
    type: mongoose.Schema.Types.ObjectId
  },
  updatedAt: Date
};

export default ICommentModel;