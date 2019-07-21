import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import AddPostPage from "./AddPostPage/AddPostPage";
import ArchivePage from "./ArchivePage/ArchivePage";
import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import PostPage from "./PostPage/PostPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import ILoadingScreenControl from "Types/ILoadingScreenControl";
import IPostModel from "Types/IPostModel";
import IUserProfile from "Types/IUserProfile";
import styles from "./Main.module.scss";

interface ISessionControl {
  login(provider: string): void;
  logout(): void;
}

interface IProps {
  loadingScreenControl: ILoadingScreenControl;
  newPost: IPostModel | null;
  posts?: IPostModel[];
  sessionControl: ISessionControl;
  socket: SocketIOClient.Socket;
  user: IUserProfile | null;
}

const Main: FunctionComponent<IProps> = (props) => (
  <div className={ styles.Main }>
    <Switch>
      <Route
        exact path="/"
        render={
          () => <HomePage
            newPost={ props.newPost }
            posts={ props.posts }
            socket={ props.socket }
          />
        }
      />

      <Route
        path="/archive"
        render={
          () => <ArchivePage
            newPost={ props.newPost }
            socket={ props.socket }
          />
        }
      />

      <Route
        exact path="/posts"
        render={
          () => <AddPostPage
            loadingScreenControl={ props.loadingScreenControl }
            socket={ props.socket }
            user={ props.user || undefined }
          />
        }
      />

      <Route
        path="/posts/:id"
        render={
          (routeCompProps) => <PostPage
            loadingScreenControl={ props.loadingScreenControl }
            match={ routeCompProps.match }
            socket={ props.socket }
            user={ props.user || undefined }
          />
        }
      />

      <Route
        path="/profile"
        render={
          () => <ProfilePage
            sessionControl={ props.sessionControl }
            socket={ props.socket }
            user={ props.user || undefined }
          />
        }
      />

      <Route component={ NotFoundPage } />
    </Switch>
  </div>
);

export default Main;