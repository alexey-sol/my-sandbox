import socketIO from "socket.io";

// Describes an object performing connection between the server and the client
// via WebSocket.

export default interface ISocketIoEvent {
  onUpdateUser(data: any, userId: string): Promise<void>;
  setSocket(socket: socketIO.Socket): void;
}