import React, { FunctionComponent } from "react";
import HeaderAside from "./HeaderAside/HeaderAside";
import HeaderNav from "./HeaderNav/HeaderNav";
import IUserProfile from "Types/IUserProfile";
import styles from "./Header.module.scss";

interface IProps {
  sessionControl: {
    login(provider: string): void;
    logout(): void;
  };
  socket: SocketIOClient.Socket;
  user: IUserProfile | null;
}

const Header: FunctionComponent<IProps> = (props) => (
  <div className={ styles.Header }>
    <HeaderNav />
    <HeaderAside
      sessionControl={ props.sessionControl }
      socket={ props.socket }
      user={ props.user }
    />
  </div>
);

export default Header;