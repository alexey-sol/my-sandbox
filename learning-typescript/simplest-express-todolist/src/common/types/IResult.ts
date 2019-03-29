// Represents a result of an operation which the server should have done, like
// "delete post".

export default interface IResult {
  result: "fail" | "success";
}