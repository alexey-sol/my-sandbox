import mongoose from "mongoose";
import IPostModel from "Types/IPostModel";

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: {
    ref: "User",
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  body: {
    content: {
      required: true,
      type: String
    },
    pictures: Array
  },
  comments: [{
    ref: "Comment",
    type: mongoose.Schema.Types.ObjectId
  }],
  header: {
    required: true,
    type: String
  },
  tags: Array
}, { collection: "posts", timestamps: true });

const Post = mongoose.model<IPostModel>("Post", postSchema);

export default Post;