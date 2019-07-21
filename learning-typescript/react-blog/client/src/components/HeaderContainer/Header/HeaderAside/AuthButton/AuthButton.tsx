import React from "react";
import IconAuth from "Components/IconAuth/IconAuth";
import LoginModal from "./LoginModal/LoginModal";
import UserMenu from "./UserMenu/UserMenu";
import IUserProfile from "Types/IUserProfile";
import styles from "./AuthButton.module.scss";

interface IProps {
  sessionControl: {
    login(provider: string): void;
    logout(): void;
  };
  socket: SocketIOClient.Socket;
  user: IUserProfile | null;
}

interface IState {
  isOpen: boolean; // displaying the popup window
}

export default class AuthButton extends React.Component<IProps, IState> {
  private authRef: React.RefObject<HTMLButtonElement>;

  constructor(props: IProps) {
    super(props);
    this.authRef = React.createRef();
    this.toggle = this.toggle.bind(this);
    this.closeOnEscape = this.closeOnEscape.bind(this);
    this.state = { isOpen: false };
  }

  public componentDidMount() {
    this.props.socket.on("providerUserId", this.toggle); // user was logged in
    document.addEventListener("keydown", this.closeOnEscape);
  }

  public componentWillUnmount = () => {
    this.props.socket.removeListener("providerUserId", this.toggle);
    document.removeEventListener("keydown", this.closeOnEscape);
  }

  // Is the user signed in? If they are, UserMenu is rendered when clicking on
  // the button; otherwise, LoginModal is rendered.
  public render() {
    const { user } = this.props;
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        {
          (user) ?
            this.showButtonForAuthorized() :
            this.showButtonForUnauthorized()
        }

        { user && isOpen &&
          <UserMenu
            logout={ this.props.sessionControl.logout }
            toggle={ this.toggle }
          /> }

        { !user && isOpen &&
          <LoginModal
            login={ this.props.sessionControl.login }
            socket={ this.props.socket }
            toggle={ this.toggle }
          /> }
      </React.Fragment>
    );
  }

  private toggle = () => this.setState({ isOpen: !this.state.isOpen });

  // Did the user press Escape? Close UserMenu or LoginModal then.
  private closeOnEscape = (event: KeyboardEvent) =>
    (event.key === "Escape") ?
      this.setState({ isOpen: false }) : null

  private showButtonForAuthorized() {
    const { user } = this.props;

    return (user) ? (
      <button
        ref={ this.authRef }
        className={ styles.AuthButton }
        title={ user.name }
        onClick={ this.toggle }
      >
        <img
          alt={ user.name }
          className={ styles.UserPicture }
          src={ user.picture }
        />
      </button>
    ) : this.showButtonForUnauthorized();
  }

  private showButtonForUnauthorized = () => (
    <button
      ref={ this.authRef }
      className={ styles.AuthButton }
      title="Войти"
      onClick={ this.toggle }
    >
      <IconAuth className={ styles.Icon } />
    </button>
  )
}