import Button from "Components/Button/Button";
import Input from "Components/Input/Input";
import React, { Component } from "react";
import Stream from "Components/Stream/Stream";
import formatDate from "Common/utils/formatDate";
import identifyErrorCode from "Common/utils/identifyErrorCode";
import styles from "./Chatroom.module.css";

export default class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.onJoin = this.onJoin.bind(this);
    this.onJoinBroadcast = this.onJoinBroadcast.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleStream = this.toggleStream.bind(this);

    this.state = {
      chatHistory: [],
      isStreamOn: false, // is changed when user clicks "toggle stream" button
      users: new Map() // all the users who are presented in the chatroom
    };
  }

  componentDidMount() {
    const { chatroomId, socket, username } = this.props;

    socket.addListener("join", this.onJoinBroadcast);
    socket.addListener("message", this.onMessage);
    socket.addListener("leave", this.onLeave);

    // Join as soon as the component is ready. 
    socket.join(chatroomId, username, this.onJoin);
  }

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeListener("join");
    socket.removeListener("message");
    socket.removeListener("leave");
  }

  createMessagesElems(chatHistoryArray) {
    return chatHistoryArray.map((message, index) =>
      <li
        className={ styles.MessageItem }
        key={ index }
      >
        <div className={ styles.MessageRow }>
          <span className={ styles.MessageDate }>
            { formatDate(new Date(message.createdAt)) }
          </span>
          <span>
            { message.authorName }
          </span>
        </div>

        <div className={ styles.MessageRow }>
          <div className={ [
            styles.MessageContent,
            (message.isLog) ? styles.Log : null
          ].join(" ") }>
            { message.message }
          </div>
        </div>
      </li>
    );
  }

  createUsersElems(usersMap) {
    const usersElems = [];
    
    for (const [index, user] of usersMap.entries()) {
      usersElems.push(
        <li key={ index }>
          { user.name }
        </li>
      );
    }

    return usersElems;
  }

  // A listener for "join" event. Unlike "onJoinBroadcast", it's only triggered
  // when the current client enters the chatroom.
  onJoin(serializedChatroom) {
    const chatroom = JSON.parse(serializedChatroom);
    chatroom.users = new Map(chatroom.users);

    // By serializing, we've converted a "users" map into an array on the
    // server side. So now we need to make them maps again.

    const { chatHistory, users } = chatroom;

    this.setState({
      chatHistory,
      users
    });
  }
  
  // A listener for "join" event. Is triggered when someone (except for the
  // current client) is joined the chatroom.
  onJoinBroadcast(incomingUser, entryOnJoin) {
    this.setState(state => {
      state.chatHistory.push(entryOnJoin); // someone "joined the chat"
      state.users.set(incomingUser.socketId, incomingUser);
      return state;
    });
  }

  // A listener for "leave" event. If someone is disconnected, the server sends
  // "leave" event to the client. It allows to inform the remained users about
  // a departure of their associate.
  onLeave(disconnectedUser, entryOnLeave) {
    this.setState(state => {
      state.users.delete(disconnectedUser.socketId);
      state.chatHistory.push(entryOnLeave); // someone "left the chat"
      return state;
    });
  }

  // A listener for "message" event. Is triggered when someone in the chatroom
  // sends a message.
  onMessage(entry) {
    this.setState(state => state.chatHistory.push(entry));
  }

  // Performs a text message from a user.
  sendMessage(event) {
    event.preventDefault();

    if (!event.target)
      return;

    const elems = event.target.elements;
    const message = elems["new-message"] && elems["new-message"].value;

    try {
      this.validateMessage(message);
    } catch (errorCode) {
      return console.error(identifyErrorCode(errorCode));
    }

    const { chatroomId, socket, username } = this.props;
    socket.message(chatroomId, username, message, this.onMessage);
  }

  // Is called when the user clicks "toggle stream" button.
  toggleStream() {
    this.setState({ isStreamOn: !this.state.isStreamOn });
    // "isStreamOn" will be passed on to "Stream" component so that it could
    // track down if the button was clicked.
  }

  validateMessage(message) {
    if (typeof message !== "string" || message.length === 0)
      throw "ERR_EMPTY_INPUT";
  }

  render() {
    const {
      chatHistory,
      isStreamOn,
      users
    } = this.state;

    // "messagesElems", "usersElems", "videoElems" are arrays of elements to
    // render.

    const messagesElems = this.createMessagesElems(chatHistory);
    const usersElems = this.createUsersElems(users);

    return (
      <div className={ styles.Chatroom }>
        <div className={ styles.HeaderBlock }>
          <div className={ styles.UsersListContainer }>
            <div>
              Folks in the chat:
            </div>
            <ul className={ styles.UsersList }>
              { usersElems }
            </ul>
          </div>
          <div className={ styles.Controls }>
            <Button onClick={ this.toggleStream }>
              Toggle stream
            </Button>
            <Button onClick={ this.props.leaveChat }>
              Leave the chat
            </Button>
          </div>
        </div>

        <div className={ styles.OutputBlock }>
          <ul className={ styles.MessagesList }>
            { messagesElems }
          </ul>
          <div className={ styles.VideoContainer }>
            {/*
              We pass on "isStreamOn" state to "Stream". It would be better to
              render "Stream" depending on this state but there're some
              intricacies due to which this component must be present always if
              we need audio/video chat. So we pass this state as a prop to it.
            */}
            <Stream
              isStreamOn={ isStreamOn }
              socket={ this.props.socket }
              users={ users }
            />
          </div>
        </div>

        <form
          className={ styles.InputBlock }
          onSubmit={ this.sendMessage }
        >
          <Input
            name="new-message"
            style={{ width: "100%" }}
          />
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
          >
            Send
          </Button>
        </form>

        <div className={ styles.ShareLinkBlock }>
          <span>
            Share the link:
          </span>
          <span>
            { window.location.href }
          </span>
        </div>
      </div>
    );
  }
}