// Returns a string describing the given error code.

export default function identifyErrorCode(errorCode) {
  if (typeof errorCode !== "string")
    return 'Error: invalid "errorCode" data type at "identifyErrorCode"';

  switch (errorCode) {
    case "ERR_EMPTY_INPUT":
      return "The input must contain something";

    case "ERR_USERNAME_OCCUPIED":
      return "The given name is already occupied";
  }
}