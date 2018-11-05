import express from "express";
import api from "./api";

const router = express.Router();

// router.get("/", (request, response) => {
//   response.send("Hello there!");
// })

router.post("/:taskId", api.addTask);
// router.delete("/api/:taskId", api.deleteTask);
router.get("/:taskId", api.getTask);
// router.put("/api/:taskId", api.updateTask);

// error handler?

export default router;