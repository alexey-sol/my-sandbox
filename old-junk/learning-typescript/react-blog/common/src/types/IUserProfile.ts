import ICommentModel from "./ICommentModel";
import IIndexer from "./IIndexer";
import IPostModel from "./IPostModel";

// Describes the field "profile" from "user" (which is a document from "users"
// collection).

export default interface IUserProfile extends IIndexer<any> {
  birthdate: Date | null;
  comments: ICommentModel[];
  email: string;
  name: string;
  picture: string;
  posts: IPostModel[];
  role: "admin" | "user";
  sex: string | null;
}