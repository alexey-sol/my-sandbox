import { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Chatroom from "Components/Chatroom/Chatroom";
import Enrollment from "Components/Enrollment/Enrollment";
import Socket from "Common/Socket";
import identifyErrorCode from "Common/utils/identifyErrorCode";
import styles from "./App.module.css";

const config = require("config");
const serverUrl = config.serverUrl;
const socket = new Socket(serverUrl);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.leaveChat = this.leaveChat.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.state = {
      chatroomId: null,
      username: null      
    };
  }

  // Forces disconnect and reloads the page.
  leaveChat() {
    document.location.reload();
    socket.disconnect();
  }

  // Is triggered on the form submit, when the user puts their name in the
  // input and submits it.
  registerUser(event) {
    event.preventDefault();

    if (!event.target)
      return;

    const elems = event.target.elements;
    const username = elems.username && elems.username.value;

    try {
      this.validateUsername(username);
    } catch (errorCode) {
      return console.error(identifyErrorCode(errorCode));
    }

    const pathnameArray = window.location.pathname.split("/");
    const currentChatroomId = pathnameArray[2];

    const onSwitchRoom = (chatroomId) =>
      this.setState({ chatroomId, username });

    const onCheckUsername = (errorCode) =>
      (errorCode)
        ? console.error(identifyErrorCode(errorCode))
        : socket.switchRoom(currentChatroomId, onSwitchRoom);

    // First check if this name isn't already occupied. If it's not, then let
    // the user in the chatroom.
    
    // If there's no such a chatroom, a new one will be created. In any case,
    // the client will get the contents of the room via "join" event (the
    // listener is in "Chatroom" component).

    socket.checkUsername(currentChatroomId, username, onCheckUsername);
  }

  validateUsername(username) {
    if (typeof username !== "string" || username.length === 0) {
      throw "ERR_EMPTY_INPUT";
    }
  }

  render() {
    const { chatroomId, username } = this.state;

    // If there's the chatroom's ID in the URL, provide route to this room.
    // Render "Enrollment" (a component which asks the user to enter their
    // name) if there's no ID.

    // Since "chatroomId" state is null by default and gets a meaningful value
    // via "switchRoom" event, "Enrollment" is rendered is always when the
    // user visits the page, even if the ID is present in URL. Only when the
    // user submits their name, "switchRoom" may be fired.

    return (
      <BrowserRouter>
        <div className={ styles.App }>
          <Switch>
            {
              chatroomId && <Route
                path="/room/:chatroomId"
                render={
                  () => <Chatroom
                    chatroomId={ chatroomId }
                    leaveChat={ this.leaveChat }
                    socket={ socket }
                    username={ username }
                  />
                }
              />
            }

            {
              (chatroomId)
                ? <Redirect to={ `/room/${chatroomId}` } />
                : <Enrollment
                    registerUser={ this.registerUser }
                  />
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}