import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Task from "../../../common/model/Task";
import ITaskModel from "../../../common/types/ITaskModel";

interface IGetTask {
  (request: Request, response: Response, next: NextFunction): Promise<void>;
}

let getTask: IGetTask;

getTask = async function getTask(request: Request, response: Response, next: 
NextFunction) {
  const paramsSchema = Joi.object().keys({
    taskId: Joi.string().required()
  });
  
  const { error, value: params } = Joi.validate(request.params, paramsSchema,
    { stripUnknown: true });

  if (error)
    return next(error);

  const taskId = params.taskId;
  let task: ITaskModel | null;

  try {
    task = await Task.findById(taskId);
  } catch (error) {
    return next(error);
  }

  response.send(task);
}

export default getTask;