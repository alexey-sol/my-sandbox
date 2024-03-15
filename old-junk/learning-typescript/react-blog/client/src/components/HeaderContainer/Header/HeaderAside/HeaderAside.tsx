import React, { FunctionComponent } from "react";
import AuthButton from "./AuthButton/AuthButton";
import ButtonContainer from "Components/ButtonContainer/ButtonContainer";
import SearchButton from "./SearchButton/SearchButton";
import IUserProfile from "Types/IUserProfile";
import styles from "./HeaderAside.module.scss";

interface IProps {
  sessionControl: {
    login(provider: string): void;
    logout(): void;
  };
  socket: SocketIOClient.Socket;
  user: IUserProfile | null;
}

const HeaderAside: FunctionComponent<IProps> = (props) => (
  <div className={ styles.HeaderAside }>
    <ButtonContainer>
      <SearchButton />
    </ButtonContainer>
    <ButtonContainer>
      <AuthButton
        sessionControl={ props.sessionControl }
        socket={ props.socket }
        user={ props.user }
      />
    </ButtonContainer>
  </div>
);

export default HeaderAside;