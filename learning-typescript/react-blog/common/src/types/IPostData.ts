// Describes valid data that can form a new document in "posts" collection.

export default interface IPostData {
  author: string;
  // comments
  body: {
    content: string;
    pictures: string[];
  };
  header: string;
  tags: string[];
}