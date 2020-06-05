module.exports = class {
  constructor(chatroomId) {
    this.id = chatroomId;
    this.chatHistory = [];
    this.users = new Map(); // all the users who are present in the room
  }

  addUser(user) {
    this.users.set(user.socketId, user);
  }

  // Stringifies the object and returns this string. This method also converts
  // "peers" and "users" maps into arrays, so after parsing, we will need to
  // make them maps again (on the client side). The idea is taken from [1].
  serialize() {
    const serializedChatroom = Object.assign({}, this);
    // serializedChatroom.peers = [...this.peers];
    serializedChatroom.users = [...this.users];
    return JSON.stringify(serializedChatroom);
  }

  getChatHistory() {
    return this.chatHistory;
  }

  // Find a user in the room by their "socketId" or "username".
  getUser(socketId, username) {
    if (socketId) {
      return this.users.get(socketId);

    } else if (username) {
      for (const member of this.users) {
        if (member[1].name === username)
          return member;
      }
    }

    return null;
  }

  removeUser(socketId) {
    this.users.delete(socketId);
  }

  updateChatHistory(entry) {
    this.chatHistory.push(entry);
  }  
}

// [1]: http://2ality.com/2015/08/es6-map-json.html