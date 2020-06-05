const express = require("express");
const http = require("http");
const middleware = require("./middleware");
const router = require("./router");
const serverConfig = require("../config/server");
const socketIo = require("socket.io");
const SocketController = require("../common/socket/SocketController");
const uuidv4 = require("uuid/v4");
const { handleCheckUsername } = SocketController();
const { port } = serverConfig;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

server.listen(port, () => console.log(`Listening to server on port ${port}`));

// Serving static files.
app.use("/dependencies", express.static("node_modules"));
app.use(express.static("client/public"));

// Loading routes.
app.use("/", router);
app.use(middleware.handleError);

// Dealing with WebSocket.
io.sockets.on("connection", (socket) => {
  socket.on("checkUsername", handleCheckUsername);

  socket.on("switchRoom", (chatroomId, callback) => {
    const room = chatroomId || uuidv4();

    const {
      handleDisconnect,
      handleJoin,
      handleMediaMessage,
      handleMessage
    } = SocketController(socket, room);

    socket.join(room).on("disconnect", handleDisconnect);
    socket.join(room).on("join", handleJoin);
    socket.join(room).on("mediaMessage", handleMediaMessage);
    socket.join(room).on("message", handleMessage);

    callback(room);
    // Is everything ready? Calling this "callback" tells the client that it
    // can fire "register".
  });
});

module.exports = app;