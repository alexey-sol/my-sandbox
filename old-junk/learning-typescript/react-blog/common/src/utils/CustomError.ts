export default class CustomError {
  protected name: string;
  private message: string;
  private stack: string | undefined;

  constructor(message: string) {
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = "CustomError";
  }
}