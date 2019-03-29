import { Request, Response, NextFunction } from "express";
import Task from "../../../common/model/Task";
import ITaskModel from "../../../common/types/ITaskModel";

interface IGetAllTasks {
  (request: Request, response: Response, next: NextFunction): Promise<void>;
}

let getAllTasks: IGetAllTasks;

getAllTasks = async function getAllTasks(request: Request, response: Response,
next: NextFunction) {
  let tasksList: ITaskModel[];

  try {
    tasksList = (await Task.find({})) || [];
  } catch (error) {
    return next(error);
  }

  response.send(tasksList);
}

export default getAllTasks;