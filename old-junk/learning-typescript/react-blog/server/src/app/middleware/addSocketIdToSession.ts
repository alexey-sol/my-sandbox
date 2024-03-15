import { NextFunction, Request, Response } from "express";

type IAddSocketIdToSession =
  (request: Request, response: Response, next: NextFunction) => void;

// Attaches a socket's ID to the session to set up the connection with a
// relative client.
let addSocketIdToSession: IAddSocketIdToSession;

addSocketIdToSession = function(
  request: Request,
  response: Response,
  next: NextFunction
): void {

  if (request.session)
    request.session.socketId = request.query.socketId;

  next();
};

export default addSocketIdToSession;