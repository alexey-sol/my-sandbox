import CustomError from "./CustomError";

// Creates an error which denotes invalid input in a form on the client.

export default class UserInputError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "UserInputError";
  }
}