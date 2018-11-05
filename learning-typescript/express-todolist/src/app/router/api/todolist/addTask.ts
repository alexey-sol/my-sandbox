import { Request, Response, NextFunction } from "express";
import Task from "./TaskInterface";

export default addTask;

async function addTask(request: Request, response: Response, next: NextFunction) {

  return {title: "huh?"}; // return what we've added
}