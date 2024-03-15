import React, { FunctionComponent } from "react";
import Main from "./Main/Main";
import ILoadingScreenControl from "Types/ILoadingScreenControl";
import IPostModel from "Types/IPostModel";
import IUserProfile from "Types/IUserProfile";
import styles from "./MainContainer.module.scss";

interface IProps {
  loadingScreenControl: ILoadingScreenControl;
  newPost: IPostModel | null;
  posts?: IPostModel[];
  sessionControl: {
    login(provider: string): void;
    logout(): void;
  };
  socket: SocketIOClient.Socket;
  user: IUserProfile | null;
}

const MainContainer: FunctionComponent<IProps> = (props) => (
  <div className={ styles.MainContainer }>
    <Main
      loadingScreenControl={ props.loadingScreenControl }
      newPost={ props.newPost }
      posts={ props.posts }
      sessionControl={ props.sessionControl }
      socket={ props.socket }
      user={ props.user }
    />
  </div>
);

export default MainContainer;