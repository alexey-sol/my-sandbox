import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import Task from "../../../common/model/Task";
import IIndexer from "../../../common/types/IIndexer";
import IResult from "../../../common/types/IResult";
import ITaskModel from "../../../common/types/ITaskModel";

function validateData(data: any, schema: Joi.ObjectSchema) {
  const { error, value: result } = Joi.validate(
    data, schema, { stripUnknown: true }
  );

  if (error)
    throw error;
  else
    return result;
}

interface IUpdateTask {
  (request: Request, response: Response, next: NextFunction): Promise<void>;
}

let updateTask: IUpdateTask;

updateTask = async function updateTask(request: Request, response: Response,
next: NextFunction) {
  let params;
  let taskData;

  const paramsSchema = Joi.object().keys({
    taskId: Joi.string().required()
  });

  const taskDataSchema = Joi.object().keys({
    content: Joi.string().optional(),
    tagsList: Joi.array().optional(),
    title: Joi.string().optional()
  });

  try {
    params = validateData(request.params, paramsSchema);
  } catch (error) {
    return next(error);
  }

  try {
    taskData = validateData(request.body, taskDataSchema);
  } catch (error) {
    return response.send(error) && undefined;
  }

  const fail: IResult = { result: "fail" };
  const success: IResult = { result: "success" };

  let task: (ITaskModel & IIndexer<any>) | null;

  try {
    task = await Task.findById(params.taskId);
  } catch (error) {
    return next(error);
  }

  if (!task)
    return response.send(fail) && undefined;

  let changesCount = 0;
  // Allows to find out if there are actual changes in fields.

  for (let key in taskData) {
    if (task[key] !== taskData[key]) {
      task[key] = taskData[key];
      changesCount++;
    }
  }

  if (changesCount === 0) // nothing new? Then let DB be
    return response.send(fail) && undefined;

  try {
    await task.save();
  } catch (error) {
    return next(error);
  }

  response.send(success);
};

export default updateTask;