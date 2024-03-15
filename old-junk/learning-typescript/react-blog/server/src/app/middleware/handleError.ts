import { Request, Response } from "express";
import logger from "Utils/logger";

type IHandleError =
  (error: Error, request: Request, response: Response) => void;

let handleError: IHandleError;

handleError = function(
  error: Error,
  request: Request,
  response: Response
): void {
  logger.error(error.message, error);
  response.send(error);
};

export default handleError;