import path from "path";
import { NextFunction, Request, Response } from "express";

const indexFile = path.join(
  __dirname, "Client/public/index.html"
);

const publicRoute = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.sendFile(indexFile, (error: Error) =>
    (error) ? next(error) : null);
};

export default publicRoute;