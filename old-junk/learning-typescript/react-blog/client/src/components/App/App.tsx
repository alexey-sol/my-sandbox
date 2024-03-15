import React from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import FooterContainer from "Components/FooterContainer/FooterContainer";
import HeaderContainer from "Components/HeaderContainer/HeaderContainer";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";
import MainContainer from "Components/MainContainer/MainContainer";
import Popup from "Components/Popup/Popup";
import ILoadingScreenControl from "Types/ILoadingScreenControl";
import IPostModel from "Types/IPostModel";
import IProviderError from "Types/IProviderError";
import ISessionControl from "Types/ISessionControl";
import IServerError from "Types/IServerError";
import IResult from "Types/IResult";
import IUserProfile from "Types/IUserProfile";
import styles from "./App.module.scss";

const config = require("config");
const serverUrl = config.serverUrl;
const socket = io.connect(serverUrl);

interface IState {
  errorMessage: string;
  isLoading: boolean;
  loadingSubsNum: number;
  newPost: IPostModel | null;
  posts: IPostModel[];
  user: IUserProfile | null;
}

export default class App extends React.Component<{}, IState> {
  private loadingScreenControl: ILoadingScreenControl;
  private popup: Window | null = null;
  private providers: string[] = ["yandex"];
  private sessionControl: ISessionControl;

  constructor(props: {}) {
    super(props);

    // "decrementLoadingSubsNum" and "incrementLoadingSubsNum" control the
    // emergence of the loading screen. If "loadingSubsNum" state is 0, the
    // screen disappears; if it's larger than 0, the screen emerges. It's not
    // a boolean value because there may be a number of events which may
    // require the loading screen. Other components may also need this
    // functionality, so we form "loadingScreenControl" object to pass these
    // methods further.

    this.decrementLoadingSubsNum = this.decrementLoadingSubsNum.bind(this);
    this.incrementLoadingSubsNum = this.incrementLoadingSubsNum.bind(this);
    this.loadingScreenControl = {
      decrementLoadingSubsNum: this.decrementLoadingSubsNum,
      incrementLoadingSubsNum: this.incrementLoadingSubsNum
    };

    // "login" and "logout" aren't utilized here, so we pass them to the nested
    // components as "sessionControl" object.

    this.sessionControl = {
      login: this.login.bind(this),
      logout: this.logout.bind(this)
    };

    this.state = {
      errorMessage: "",
      isLoading: false,
      loadingSubsNum: 0,
      newPost: null,
      posts: [],
      user: null
    };
  }

  public componentDidMount() {
    // First of all, let's try to sign in right away. If the user has a session
    // on the server, they will be authenticated. Also let's request the recent
    // posts.

    // These 2 operations are long-term, so they need the loading screen. We
    // need to increment "loadingSubsNum" 2 times.
    this.incrementLoadingSubsNum(2);

    socket.emit("getAllPosts");
    this.authenticate();

    // Now, let's deal with various events. Authentication-related ones will be
    // dealt with first.

    // Did the server send the redirect URL leading to the provider's site?
    // This URL is intended for a popup window.
    socket.on("redirectUrl", (url: string) => {
      if (this.popup)
        this.popup.location.href = url;
    });

    // Did the user allowed access to their profile in the provider, so the
    // needed data is received and successfuly processed on the server?
    socket.on("providerUserId", (userId: string) => {
      if (this.popup)
        this.popup.close();

      this.authenticate(userId);
    });

    // Did there occur an error when the user tried to allow access to their
    // profile?
    socket.on("providerError", (error: IProviderError) => {
      if (this.popup)
        this.popup.close();

      console.error(`${error.error}: ${error.error_description}`);
      this.setState({ errorMessage: "Ошибка аутентификации" });
    });

    // Did there occur an error when the user was supposed to be added to DB?
    socket.on("providerError", (error: IServerError) => {
      if (this.popup)
        this.popup.close();

      console.error(`${error.error}: ${error.error_description}`);
      this.setState({
        errorMessage: "Ошибка сервера. Пожалуйста, попробуйте повторить позже"
      });
    });

    // Did the user publish a new post? It's needed to be rendered then.
    socket.on("addPost", (response: IPostModel | IResult) => {
      if ((response as IResult).result === "fail")
        return;

      this.setState({ newPost: response as IPostModel });
    });

    // Did we get posts?
    socket.on("getAllPosts", (posts: IPostModel[]) => {
      this.setState({ posts }, () => {
        this.decrementLoadingSubsNum();
      });
    });
  }

  public render() {
    const { errorMessage, loadingSubsNum, newPost, posts, user } = this.state;
    const popupMaxAge = 3000;

    return (
      <BrowserRouter>
        <div className={ styles.App }>
          <HeaderContainer
            sessionControl={ this.sessionControl }
            socket={ socket }
            user={ user }
          />

          <MainContainer
            loadingScreenControl={ this.loadingScreenControl }
            newPost={ newPost }
            posts={ posts }
            sessionControl={ this.sessionControl }
            socket={ socket }
            user={ user }
          />

          <FooterContainer />

          {
            (loadingSubsNum > 0) && <LoadingScreen />
          }

          {
            errorMessage &&

            <Popup close={ this.closePopup } options={{
              isOverlappable: true,
              isStretched: true,
              maxAge: popupMaxAge,
              theme: "error"
            }}>
              { errorMessage }
            </Popup>
          }

        </div>
      </BrowserRouter>
    );
  }

  // Makes a POST request to "/auth". If "userId" argument is missing, it
  // checks if there's a session so the user may come in. It's a usual thing
  // when loading the page.

  // The presence of "userId" means that the user just signed in via a provider
  // and now needs to obtain a proper session on the back-end.
  private async authenticate(userId?: string) {
    const requestOptions = {
      data: (userId) ? { userId } : null,
      method: "POST",
      url: "/auth",
      withCredentials: true // cookies on
    };

    const response: IUserProfile | IResult = (await axios(requestOptions)).data;
    const isFail = (response as IResult).result === "fail";

    this.decrementLoadingSubsNum();

    // setTimeout(() => this.setState({ isLoading: false }), 700);
    // Give LoadingScreen an extra time before hiding (so its emergence and
    // disappearance seems more "natural").

    if (isFail)
      return console.log("Didn't manage to authenticate");

    this.setState({ user: response as IUserProfile });

    // It's essential to force reconnection of the socket here: it synchronizes
    // the socket with the request. Without it, "socket.handshake" on the
    // server doesn't get session property until the user manually refreshes
    // the page (having initializied "connection" event this way).

    socket.disconnect();
    socket.connect();
  }

  private closePopup = () => this.setState({ errorMessage: "" });

  private decrementLoadingSubsNum() {
    const { loadingSubsNum } = this.state;

    if (loadingSubsNum > 0)
      this.setState({ loadingSubsNum: loadingSubsNum - 1 });
  }

  private incrementLoadingSubsNum(times: number = 1) {
    this.setState({ loadingSubsNum: this.state.loadingSubsNum + times });
  }

  // Creates a popup window.
  private openPopup(url: string, name: string, width: number = 600, height:
  number = 600) {
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    return window.open(
      url, name, `toolbar=no, location=no, directories=no, status=no,
      menubar=no, scrollbars=no, resizable=no, copyhistory=no,
      width=${width}, height=${height}, top=${top}, left=${left}`
    );
  }

  // "login" starts the process of authentication. Creates a popup window with
  // HREF which leads the user to "/auth/providerName".

  // The route creates a redirect URL which is sent via Socket.IO event
  // "redirectUrl". When the client gets the redirect URL, it's put in the
  // popup's HREF, so the user is leaded to the provider's site where they can
  // allow access to their profile.

  // Sooner or later, the client gets one of two Socket.IO events:
  // "providerUserId" (which means that everything is fine and the user may
  // come in) or "providerError" (which usually means that the provider hasn't
  // confirmed user identity).

  private login(provider: string) {
    const isProperProvider = this.providers.includes(provider);
    // Check if it's a proper provider's name in the related argument, not an
    // arbitrary string.

    if (!isProperProvider) return;

    this.popup = this.openPopup(`${serverUrl}/auth/${provider}?socketId`
      + `=${socket.id}`, "");
    // The URL also includes the ID of the socket so that the server knew who
    // it should connect with later.
  }

  // Destroys the user's session on the back-end via a GET request.
  private async logout() {
    const requestOptions = {
      method: "GET",
      url: "/auth/logout",
      withCredentials: true
    };

    const response = await axios(requestOptions);
    const result = response && response.data.result;

    if (result === "success")
      this.setState({ user: null });

    else if (result === "fail") {
      console.error("Didn't manage to access session");
      this.setState({
        errorMessage: "Ошибка сервера: не удалось получить доступ к сессии"
      });
    }
  }
}