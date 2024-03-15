const chatrooms = new Map();

const add = (chatroom) =>
  chatrooms.set(chatroom.id, chatroom);

const get = (chatroomId) =>
  chatrooms.get(chatroomId);

const getAll = () =>
  chatrooms;

const remove = (chatroomId) =>
  chatrooms.delete(chatroomId);

module.exports = {
  add,
  get,
  getAll,
  remove
};