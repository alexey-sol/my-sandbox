import React from "react";
import Article from "Components/Article/Article";
import Paragraph from "Components/Paragraph/Paragraph";
import Post from "Components/Post/Post";
import IPostModel from "Types/IPostModel";
import IResult from "Types/IResult";
import IUserProfile from "Types/IUserProfile";

interface IProps {
  newPost: IPostModel | null;
  posts?: IPostModel[];
  socket: SocketIOClient.Socket;
}

export default class HomePage extends React.Component<IProps> {
  public render() {
    const { newPost, posts } = this.props;
    const postElems = posts && posts.map(post =>
      <Post
        key={ post._id }
        post={ post }
        isPreview={ true }
      />
    );

    return (posts) ? (
      <React.Fragment>
        { newPost && <Post post={ newPost } isPreview={ true } /> }
        { postElems }
      </React.Fragment>
    ) : null;
  }
}