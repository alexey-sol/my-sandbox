import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pageRouter, apiRouter } from "./router";
import middleware from "./middleware";

const app = express();
const server = require("http").createServer(app);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use("/", pageRouter);
app.use("/api", apiRouter);
app.use(middleware.handleError);

app.set("_server", server);

export default app;