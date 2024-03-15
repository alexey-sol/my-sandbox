import React from "react";
import Post from "Components/Post/Post";
import ILoadingScreenControl from "Types/ILoadingScreenControl";
import IPostModel from "Types/IPostModel";
import IUserProfile from "Types/IUserProfile";

interface IProps {
  loadingScreenControl: ILoadingScreenControl;
  match: any;
  socket?: SocketIOClient.Socket;
  user?: IUserProfile;
}

interface IState {
  post: IPostModel | null;
}

export default class PostPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { post: null };
  }

  public componentDidMount() {
    const { loadingScreenControl: control, socket } = this.props;
    const { id } = this.props.match.params;

    if (!socket)
      return console.error("Profile component: didn't manage to mount"
      + " PostPage: required props are missing");

    // Let's request the post first. It's a long-term operation which needs
    // the loading screen.

    socket.emit("getPost", id);
    control.incrementLoadingSubsNum();

    // Did we get the post?
    socket.on("getPost", (post: IPostModel) => {
      this.setState({ post }, () => {
        control.decrementLoadingSubsNum();
      });
    });
  }

  public componentWillUnmount() {
    const { socket } = this.props;

    if (socket) {
      socket.removeListener("getPost");
    }
  }

  public render() {
    const { post } = this.state;

    return (post) ? (
      <Post post={ post } />
    ) : null;
  }
}