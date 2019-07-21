import Joi from "joi";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import expressSession from "express-session";
import sharedSession from "express-socket.io-session";
import socketIO from "socket.io";
import uuidv4 from "uuid/v4";
import { authRouter, publicRouter } from "./router";
import config from "../config";
import logger from "Utils/logger";
import middleware from "./middleware";
import PostController from "Utils/PostController";
import SocketIoEvent from "Utils/SocketIoEvent";
import UserController from "Utils/UserController";
const MongoStore = require("connect-mongo")(expressSession);

// Some checks for a start: there should be certain environmental variables.
const envSchema = Joi.object().keys({
  SESSION_SECRET: Joi.string().min(1).required()
});

const { error, value: env } = Joi.validate(process.env, envSchema,
  { stripUnknown: true });

if (error)
  logger.error("Please set SESSION_SECRET", error);

// Session options.
const sessionSecret = env.SESSION_SECRET || "";
const sessionStore = new MongoStore({ url: config.db.dbUrl });
const sessionMiddleware = expressSession({
  cookie: { maxAge: 1000 * 86400 * 30, httpOnly: false }, // keep it 30 days
  genid: () => uuidv4(),
  name: "sess",
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  store: sessionStore
});

// Creating a server, binding Socket.IO to the server
const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(helmet());

// Serving static files.
app.use("/dependencies", express.static("node_modules"));
app.use(express.static("client/public"));

// Attaching a session object to a request.
app.use(sessionMiddleware);
io.use(sharedSession(sessionMiddleware, cookieParser(sessionSecret),
  { autoSave: true }));

// Routing and handling errors.
app.use("/auth", authRouter);
app.use("/", publicRouter);
app.use(middleware.handleError);
// "publicRouter" should be mounted last: it has a "/*" route

// Dealing with Socket.IO events.
const socketIoEvent = new SocketIoEvent(
  new PostController(),
  new UserController()
);

io.sockets.on("connection", (socket) => {
  socketIoEvent.setSocket(socket);
  const { session } = socket.handshake;

  socket.on("getAllPosts", () => socketIoEvent.onGetAllPosts());
  socket.on("getPost", (postId) => socketIoEvent.onGetPost(postId));

  if (!(session && session.user)/* && (nodeEnv !== "test")*/)
    return "disconnect";

  const userId = session.user._id;

  socket.on("deleteUser", () => socketIoEvent.onDeleteUser(userId));
  socket.on("updateUser", (data) => socketIoEvent.onUpdateUser(data, userId));

  socket.on("addPost", (data) => socketIoEvent.onAddPost(userId, data));

});

// Attach some custom properties to the application object we may need later.
app.set("_io", io);
app.set("_server", server);

export default app;