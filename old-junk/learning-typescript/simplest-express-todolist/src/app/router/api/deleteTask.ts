import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import IResult from "../../../common/types/IResult";
import Task from "../../../common/model/Task";

interface IDeleteTask {
  (request: Request, response: Response, next: NextFunction): Promise<void>;
}

let deleteTask: IDeleteTask;

deleteTask = async function deleteTask(request: Request, response: Response,
next: NextFunction) {
  const paramsSchema = Joi.object().keys({
    taskId: Joi.string().required()
  });
  
  const { error, value: params } = Joi.validate(request.params, paramsSchema,
    { stripUnknown: true });

  if (error)
    return next(error);

  // As practice shows, if there was no such a param in the request, this route 
  // wouldn't be triggered at all. So, in the given case, there's no much point
  // in that check. Although who knows, maybe, later "taskId" will be delivered
  // via body, so this check will come in handy.

  const fail: IResult = { result: "fail" };
  const success: IResult = { result: "success" };

  let deleted;

  try {
    deleted = await Task.deleteOne({ _id: params.taskId });
  } catch (error) {
    return next(error);
  }

  (deleted.deletedCount === 0) ?
    response.send(fail) :
    response.send(success);
}

export default deleteTask;