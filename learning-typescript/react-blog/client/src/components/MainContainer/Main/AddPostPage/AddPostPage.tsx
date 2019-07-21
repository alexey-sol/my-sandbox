import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Redirect } from "react-router-dom";
import Button from "Components/Button/Button";
import Input from "Components/Input/Input";
import Popup from "Components/Popup/Popup";
import UserInfo from "Components/UserInfo/UserInfo";
import UserInputError from "Utils/UserInputError";
import ILoadingScreenControl from "Types/ILoadingScreenControl";
import IPostModel from "Types/IPostModel";
import IResult from "Types/IResult";
import IUserProfile from "Types/IUserProfile";
import styles from "./AddPostPage.module.scss";

const tinymceApiKey = "4f0f7c55ndnp0o2r0r8chtmjd505qmhbg0psc5lf6at9ni3b"; // nodeEnv

interface IProps {
  loadingScreenControl: ILoadingScreenControl;
  socket?: SocketIOClient.Socket;
  user?: IUserProfile;
}

interface IState {
  invalidInputName: string;
  redirect: boolean;
  errorMessage: string;
}

interface IPostCollection extends HTMLCollection {
  content: HTMLTextAreaElement;
  header: HTMLInputElement;
}

interface IPostCollectionData {
  body: {
    content: string;
    pictures?: string[];
  };
  header: string;
}

export default class AddPostPage extends React.Component<IProps, IState> {
  private content: string = "";

  constructor(props: IProps) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
    this.makeInputValid = this.makeInputValid.bind(this);
    this.publishPost = this.publishPost.bind(this);
    this.state = {
      errorMessage: "",
      invalidInputName: "",
      redirect: false
    };
  }

  public componentDidMount() {
    const { loadingScreenControl: control, socket } = this.props;

    if (!socket)
      return console.error("Profile component: didn't manage to mount"
      + " AddPostPage: required props are missing");

    control.incrementLoadingSubsNum();
    // Turn on the loading screen until TinyMCE is initialized.

    socket.on("addPost", (response: IPostModel | IResult) => {
      if ((response as IResult).result === "fail")
        return this.setState({ errorMessage: "Не удалось опубликовать запись" });

      this.setState({ redirect: true });
      // If the post is successfuly published, redirect the user to the main
      // page.
    });
  }

  public componentWillUnmount() {
    const { socket } = this.props;

    if (socket)
      socket.removeListener("addPost");
  }

  public render() {
    const { invalidInputName, redirect, errorMessage } = this.state;
    const { loadingScreenControl: control, user } = this.props;
    const popupMaxAge = 3000;

    return (user) ? (
      <form className={ styles.AddPostPage } onSubmit={ this.publishPost }>
        {/* <UserInfo name={ user.name } picture={ user.picture } /> */}

        <div className={ styles.Header }>
          <Input
            isInvalidInput={ (invalidInputName === "header") && true }
            // onChange={ this.handleChange }
            onFocus={ this.makeInputValid }
            name="header"
            placeholder="Заголовок"
            style={{ fontSize: "1.5em", height: "2em" }}
            type="text"
          />
        </div>

        <div className={ styles.Body }>
          <Editor id="content" apiKey={ tinymceApiKey } init={{
            content_style: "p, ul { font-size: 1.2em; }",
            height: 500,
            menubar: false,
            plugins: "lists",
            resize: false,
            setup: (editor: any) => {
              editor.on("init", () => {
                control.decrementLoadingSubsNum();
                // Is TinyMCE initialized? Turn off the loading screen.
              });

              // Watches regular input.
              editor.on("input", () => {
                this.content = editor.getContent();
              });

              // Watches the use of text formatting (this functionality doesn't
              // fire "input").
              editor.on("change", () => {
                this.content = editor.getContent();
              });
            },
            statusbar: false,
            toolbar: "bold | italic | underline | strikethrough | bullist"
          }} />
          <div className={ styles.Pictures }>
          </div>
        </div>
        <div className={ styles.Tags }>
        </div>

        <Button
          isStretched={ false }
          type="submit"
        >Опубликовать</Button>

        {
          (errorMessage) ?
            <Popup close={ this.closePopup } options={{
              isOverlappable: true,
              isStretched: true,
              maxAge: popupMaxAge,
              theme: "error"
            }}>
              { errorMessage }
            </Popup> : null
        }

        {
          redirect && <Redirect exact to="/" />
        }

      </form>
    ) : null;
  }

  private closePopup = () => this.setState({ errorMessage: "" });

  // An input field must get rid of "error" state when focusing it.
  private makeInputValid(event: React.FocusEvent) {
    const { invalidInputName } = this.state;
    const target = event.target as HTMLInputElement;

    if (target.name === invalidInputName)
      this.setState({ invalidInputName: "" });
  }

  private publishPost(event: React.FormEvent) {
    event.preventDefault();

    if (!this.props.socket)
      return console.error(`Profile component: didn't manage to publish`
      + ` post: "socket" prop is missing`);

    const { target } = event;

    if (!target)
      return;

    const elems = (target as HTMLFormElement).elements as IPostCollection;

    const data: IPostCollectionData = {
      body: {
        // pictures:
        content: this.content
      },
      header: elems.header && elems.header.value || ""
    };

    try {
      this.validateInput(data);
    } catch (error) {
      return (error.name === "UserInputError") ?
        this.setState({ errorMessage: error.message }) :
        console.error(error.message);
    }

    this.props.socket.emit("addPost", data);
  }

  private validateInput(data: IPostCollectionData) {
    const { body, header } = data;

    if (typeof header !== "string" || header.length === 0) {
      this.setState({ invalidInputName: "header" });
      throw new UserInputError("Пожалуйста, укажите заголовок");

    } else if (typeof body.content !== "string" || body.content.length === 0) {
      this.setState({ invalidInputName: "content" });
      throw new UserInputError("Пожалуйста, придумайте какой-нибудь текст!");
    }
  }
}