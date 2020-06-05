import io from "socket.io-client";

// This class facilitates the usage of Socket.IO on the client.

export default class Socket {
  constructor(serverUrl = "") {
    this.serverUrl = serverUrl;
    this.socket = io.connect(serverUrl, {
      "sync disconnect on unload": true
    });

    this.socket.on("error", (error) =>
      console.error(`Socket error has been received: ${error}`)
    );
  }

  addListener(event, listener) {
    this.socket.on(event, listener);
  }

  getSocket() {
    return this.socket;
  }

  // Check if someone already has such a name in the chatroom.
  checkUsername(chatroomId, username, callback) {
    this.socket.emit("checkUsername", chatroomId, username, callback);
  }

  // Forces disconnect.
  disconnect(close = true) {
    this.socket.disconnect(close);
  }

  // Is triggered when someone joins the chatroom.
  join(chatroomId, username, callback) {
    this.socket.emit("join", chatroomId, username, callback);
  }

  mediaMessage(mediaMessage, from, to) {
    this.socket.emit("mediaMessage", mediaMessage, from, to);
  }

  // Sends a message to the users inside the chatroom.
  message(chatroomId, authorName, message, callback) {
    this.socket.emit("message", chatroomId, authorName, message, callback);
  }

  removeListener(event) {
    this.socket.off(event);
  }

  // Checks if a chatroom with the specified ID exists. If it does, lets the
  // user in. Otherwise creates a new chatroom.
  switchRoom(chatroomId, callback) {
    this.socket.emit("switchRoom", chatroomId, callback);
  }
}