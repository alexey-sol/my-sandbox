// Describes the result of an operation performed by the server, which the
// client should receive as a response. "Delete post"? "Success".

export default interface IResult {
  result: "fail" | "success";
}