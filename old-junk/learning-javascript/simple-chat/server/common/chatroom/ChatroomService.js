// Communicates with chatrooms in the application.

const chatroomRepository = require("./ChatroomRepository");

const addChatroom = (chatroom) => {
  chatroomRepository.add(chatroom);
};

const addUser = (chatroomId, user) => {
  const chatroom = chatroomRepository.get(chatroomId);

  if (chatroom) {
    chatroomRepository.add(chatroom);
    chatroom.addUser(user);
  }
};

const getChatroom = (chatroomId) => {
  return chatroomRepository.get(chatroomId);
};

const getAllChatrooms = () => {
  return chatroomRepository.getAll();
}

const getUser = (chatroomId, socketId, username) => {
  const chatroom = chatroomRepository.get(chatroomId);
  let user;

  if (chatroom) {
    user =
      (socketId) ? chatroom.getUser(socketId) :
      (username) ? chatroom.getUser(null, username) :
      null;
  }

  return user;
};

const removeUser = (chatroomId, socketId) => {
  const chatroom = chatroomRepository.get(chatroomId);

  if (chatroom)
    chatroom.removeUser(socketId);
};

module.exports = {
  addChatroom,
  addUser,
  getAllChatrooms,
  getChatroom,
  getUser,
  removeUser
};