import logger from "./logger";
import socketIO from "socket.io";
import IController from "Types/IController";
import IPostData from "Types/IPostData";
import IPostModel from "Types/IPostModel";
import IPostUpdate from "Types/IPostUpdate";
import IProviderUserData from "Types/IProviderUserData";
import IResult from "Types/IResult";
import ISocketIoEvent from "Types/ISocketIoEvent";
import IUserModel from "Types/IUserModel";
import IUserProfileSubmit from "Types/IUserProfileUpdate";

export default class SocketIoEvent implements ISocketIoEvent {
  constructor(
    private postContoller:
      IController<IPostData, IPostUpdate, IPostModel>,
    private userContoller:
      IController<IProviderUserData, IUserProfileSubmit, IUserModel>,
    private socket?:
      socketIO.Socket
  ) {
    this.userContoller = userContoller;
    this.socket = socket;
  }

  public emit(event: string, data: any) {
    const { socket } = this;

    (socket) ?
      socket.emit(event, data) :
      logger.error("socket in SocketIoEvent isn't defined");
  }

  // public async onAddUser(userId: string) {
  // }

  public async onDeleteUser(userId: string) {
    const fail: IResult = { result: "fail" };
    let result: IResult;

    try {
      result = await this.userContoller.delete(userId);
    } catch (error) {
      return logger.error(error.message) && this.emit("deleteUser", fail);
    }

    this.emit("deleteUser", result);
  }

  public async onGetUser(userId: string) {
    const fail: IResult = { result: "fail" };
    let user: IUserModel | null;

    try {
      user = await this.userContoller.get(userId);
    } catch (error) {
      return logger.error(error.message) && this.emit("getUser", fail);
    }

    this.emit("getUser", user);
  }

  public async onUpdateUser(data: IUserProfileSubmit, userId: string) {
    const fail: IResult = { result: "fail" };
    let result: IResult;

    try {
      result = await this.userContoller.update(userId, data);
    } catch (error) {
      return logger.error(error.message) && this.emit("updateUser", fail);
    }

    this.emit("updateUser", result);
  }

  public async onAddPost(userId: string, data: IPostData) {
    data.author = userId;

    const fail: IResult = { result: "fail" };
    let post: IPostModel;

    try {
      post = await this.postContoller.add(data);
    } catch (error) {
      return logger.error(error.message) && this.emit("addPost", fail);
    }

    this.emit("addPost", post);
  }

  public async onGetAllPosts() {
    const fail: IResult = { result: "fail" };
    let posts: IPostModel[];

    try {
      posts = await this.postContoller.getAll();
    } catch (error) {
      return logger.error(error.message) && this.emit("getAllPosts", fail);
    }

    this.emit("getAllPosts", posts);
  }

  public async onGetPost(postId: string) {
    const fail: IResult = { result: "fail" };
    let post: IPostModel | null;

    try {
      post = await this.postContoller.get(postId);
    } catch (error) {
      return logger.error(error.message) && this.emit("getPost", fail);
    }

    this.emit("getPost", post);
  }

  public setSocket = (socket: socketIO.Socket) => this.socket = socket;
}