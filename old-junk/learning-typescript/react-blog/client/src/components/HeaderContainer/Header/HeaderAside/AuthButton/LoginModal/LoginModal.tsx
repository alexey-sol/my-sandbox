import React from "react";
import Modal from "Components/Modal/Modal";
import styles from "./LoginModal.module.scss";

interface IProps {
  socket: SocketIOClient.Socket;
  toggle: () => void;
  login(provider: string): void;
}

interface IState {
  isDisabled: boolean; // making the login buttons active/passive
}

export default class LoginModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.enableButtons = this.enableButtons.bind(this);
    this.getProviderAndLogIn = this.getProviderAndLogIn.bind(this);
    this.state = { isDisabled: false };
  }

  public componentDidMount() {
    // Is authorization over? Make the login buttons clickable again.
    this.props.socket.on("providerUserId", () => this.enableButtons);
    this.props.socket.on("providerError", () => this.enableButtons);
  }

  public render = () => (
    <Modal
      options={{ hasCloseButton: true, isFadingIn: true }}
      toggle={ this.props.toggle }
    >
      <div className={ styles.Container }>
        <div className={ styles.Title }>Вход</div>
        <div className={ styles.Content }>
          <div className={ styles.Intro }>
            Воспользоваться социальной сетью:
          </div>
          <ul className={ styles.OptionsList } >
            <li className={ styles.Option }>
              <button
                disabled={ (this.state.isDisabled) ? true : false }
                data-provider="yandex"
                className={ styles.Button }
                onClick={ this.getProviderAndLogIn }
              >Яндекс</button>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  )

  private enableButtons = () => this.setState({ isDisabled: false });

  private getProviderAndLogIn(event: React.MouseEvent) {
    event.preventDefault();
    const provider = (event.target as HTMLElement).dataset.provider;

    if (provider) {
      this.props.login(provider);
      this.setState({ isDisabled: true });
      // "Freeze" the login buttons until authorization is over.
    }
  }
}