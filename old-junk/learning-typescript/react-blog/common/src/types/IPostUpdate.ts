import IIndexer from "./IIndexer";

// Describes valid data that can update a document in "posts" collection.

export default interface IPostUpdate extends IIndexer<any> {
  body?: {
    content?: string;
    pictures?: string[];
  };
  header?: string;
  tags?: string[];
}