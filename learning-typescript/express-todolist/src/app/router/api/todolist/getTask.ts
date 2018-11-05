import { Request, Response, NextFunction } from "express";

export default getTask;

async function getTask(request: Request, response: Response, next: NextFunction) {


  response.send({title: "huh?"});
}