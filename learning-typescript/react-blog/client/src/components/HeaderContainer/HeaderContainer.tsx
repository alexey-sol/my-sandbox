import React, { FunctionComponent } from "react";
import Header from "./Header/Header";
import IUserProfile from "Types/IUserProfile";
import styles from "./HeaderContainer.module.scss";

interface IProps {
  socket: SocketIOClient.Socket;
  user: IUserProfile | null;
  sessionControl: {
    login(provider: string): void;
    logout(): void;
  };
}

const HeaderContainer: FunctionComponent<IProps> = (props) => (
  <div className={ styles.HeaderContainer} >
    <Header
      sessionControl={ props.sessionControl }
      socket={ props.socket }
      user={ props.user }
    />
  </div>
);

export default HeaderContainer;