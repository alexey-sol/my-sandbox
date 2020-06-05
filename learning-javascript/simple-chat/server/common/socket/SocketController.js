const chatroomService = require("../chatroom/ChatroomService");
const Chatroom = require("../chatroom/Chatroom");

// Checks if there's no user with such a name in the chatroom.
const handleCheckUsername = (chatroomId, username, callback) => {
  const existingUser = chatroomService.getUser(chatroomId, null, username);

  (existingUser)
    ? callback("ERR_USERNAME_OCCUPIED") // an error code
    : callback(null);
};

module.exports = (socket, room) => {
  const handleDisconnect = () => {
    const chatroom = chatroomService.getChatroom(room);
    const disconnectedUser = chatroom.getUser(socket.id);

    // Inform the folks in the chatroom that this user has gone.
    const entryOnLeave = {
      authorName: disconnectedUser.name,
      message: "has left the chat",
      createdAt: new Date(),
      isLog: true
    }

    if (disconnectedUser) {
      chatroom.updateChatHistory(entryOnLeave);
      chatroom.removeUser(socket.id);
      socket.broadcast.to(room).emit("leave", disconnectedUser, entryOnLeave);
    }
  };

  const handleJoin = (chatroomId, username, callback) => {
    let chatroom = chatroomService.getChatroom(chatroomId);

    // If there's no such a chatroom, create it.
    if (!chatroom) {
      chatroom = new Chatroom(chatroomId);
      chatroomService.addChatroom(chatroom);
    }

    const user = {
      name: username,
      socketId: socket.id
    };

    // Inform another users about arriving a new companion.
    const entryOnJoin = {
      authorName: username,
      message: "has joined the chat",
      createdAt: new Date(),
      isLog: true
    }

    chatroom.updateChatHistory(entryOnJoin);
    chatroomService.addUser(chatroomId, user);

    // Now, when we calling "callback", we send the contents of the chatroom to
    // the client: on the client, "onJoin" listener will be triggered.

    // By broadcasting, we inform other users about arriving a new member.
    // Broadcast will trigger "onJoinBroadcast" in other clients.

    // Before passing the chatroom via WebSocket, let's serialize it. This way,
    // some properties we'll be kept in safe.

    const serializedChatroom = chatroom.serialize();

    callback(serializedChatroom);

    // There're 2 listeners on the client listening to event "join" and
    // "joinStream". The 1st one adds the user to the list of members of the
    // chatroom. The 2nd one notifies the streamer (if there's a stream right
    // now in the room) that a newcomer has arrived, so it would be nice to
    // share the stream with them.

    socket.broadcast.to(room).emit("join", user, entryOnJoin);
    socket.broadcast.to(room).emit("joinStream", user);
  };

  // Participates in WebRTC communication. Distributes signal messages between
  // the users in the chatroom.
  const handleMediaMessage = (mediaMessage, from, to) => {
    socket.broadcast.to(room).emit("mediaMessage", mediaMessage, from, to);
  };

  // Distributes text messages sent by users, between clients.
  const handleMessage = (chatroomId, authorName, message, callback) => {
    const entry = {
      authorName,
      message,
      createdAt: new Date()
    };

    const chatroom = chatroomService.getChatroom(chatroomId);
    chatroom.updateChatHistory(entry);

    callback(entry); // for the client
    socket.broadcast.to(room).emit("message", entry); // for other members
  };

  return {
    handleCheckUsername,
    handleDisconnect,
    handleJoin,
    handleMediaMessage,
    handleMessage
  };
}