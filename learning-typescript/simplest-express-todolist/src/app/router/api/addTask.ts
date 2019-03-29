import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Task from "../../../common/model/Task";
import ITaskModel from "../../../common/types/ITaskModel";

interface IAddTask {
  (request: Request, response: Response, next: NextFunction): Promise<void>;
}

let addTask: IAddTask;

addTask = async function addTask(request: Request, response: Response, next:
NextFunction) {
  const taskDataSchema = Joi.object().keys({
    content: Joi.string().optional(),
    tagsList: Joi.array().optional(),
    title: Joi.string().min(1).required()
  });
  
  const { error, value: body } = Joi.validate(request.body, taskDataSchema,
    { stripUnknown: true });

  if (error)
    return response.send(error) && undefined;

  const task: ITaskModel = new Task({
    _id: new mongoose.Types.ObjectId(),
    content: body.content || "", // optional field
    tagsList: body.tagsList || [], // optional field
    title: body.title
  });

  try {
    await task.save();
  } catch (error) {
    return next(error);
  }

  response.send(task);
}

export default addTask;