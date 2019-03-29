import express from "express";
import api from "./api";
import page from "./page";

const pageRouter = express.Router();
const apiRouter = express.Router();

// Paths start with "/".
pageRouter.get("/", page.home);

// Paths start with "/api".
apiRouter.post("/", api.addTask);
apiRouter.delete("/", api.deleteAllTasks);
apiRouter.delete("/:taskId", api.deleteTask);
apiRouter.get("/", api.getAllTasks);
apiRouter.get("/:taskId", api.getTask);
apiRouter.put("/:taskId", api.updateTask);

export { pageRouter, apiRouter };