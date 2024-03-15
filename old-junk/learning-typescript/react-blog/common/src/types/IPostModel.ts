import mongoose from "mongoose";

// Describes Mongoos' model of "post": this is how a document from "posts"
// collection must look like.
// It's used when, for example, we need to get a certain document from the DB.

type IPostModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  body: {
    content: string,
    pictures: string[]
  },
  comments: [{
    ref: "Comment",
    type: mongoose.Schema.Types.ObjectId
  }],
  createdAt: Date,
  header: string,
  tags: string[],
  updatedAt: Date
};

export default IPostModel;