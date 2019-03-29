import { Request, Response, NextFunction } from "express";
import Task from "../../../common/model/Task";
import IResult from "../../../common/types/IResult";

interface IDeleteAllTasks {
  (request: Request, response: Response, next: NextFunction): Promise<void>;
}

let deleteAllTasks: IDeleteAllTasks;

deleteAllTasks = async function deleteAllTasks(request: Request, response:
Response, next: NextFunction) {
  let result: IResult;

  try {
    await Task.collection.drop();
    result = { result: "success" };
  } catch (error) {
    if (error.message === "ns not found") { // collection doesn't exist
      result = { result: "fail" };
    } else {
      return next(error);
    }
  }

  response.send(result);
}

export default deleteAllTasks;