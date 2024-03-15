import { Request, Response } from "express";

interface IHome {
  (request: Request, response: Response): void;
}

// GET home page.
const home: IHome = (request: Request, response: Response) => {
  response.redirect("/api"); // GET all the tasks
};

export default home;