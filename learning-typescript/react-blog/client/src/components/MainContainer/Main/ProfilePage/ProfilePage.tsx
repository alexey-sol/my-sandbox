import React from "react";
import { NavLink } from "react-router-dom";
import Button from "Components/Button/Button";
import Form from "Components/Form/Form";
import Input from "Components/Input/Input";
import Popup from "Components/Popup/Popup";
import Select from "Components/Select/Select";
import isEmail from "Utils/isEmail";
import Formatter from "Utils/Formatter";
import UserInputError from "Utils/UserInputError";
import IProfileCollection from "Types/IProfileCollection";
import IProfileCollectionData from "Types/IProfileCollectionData";
import IResult from "Types/IResult";
import IUserProfile from "Types/IUserProfile";
import styles from "./ProfilePage.module.scss";

interface IProps {
  sessionControl?: {
    login(provider: string): void;
    logout(): void;
  };
  socket?: SocketIOClient.Socket;
  user?: IUserProfile;
}

interface IState {
  isChanged: boolean;
  invalidInputName: string;
  userInputError: string;
  userNotification: string;
}

export default class ProfilePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeInputValid = this.makeInputValid.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.state = {
      invalidInputName: "",
      isChanged: false,
      userInputError: "",
      userNotification: ""
    };
  }

  public componentDidMount() {
    const { sessionControl, socket } = this.props;

    console.log(window.location);
    // Как организовать роутинг в реакт приложении?
    // https://maxpfrontend.ru/vebinary/voprosy-dlya-sobesedovaniya-javascript-razrabotchika/

    if (!socket || !sessionControl)
      return console.error("Profile component: didn't manage to mount"
      + " Profile: required props are missing");

    socket.on("deleteUser", (response: IResult) => {
      (response.result === "success") ?
        sessionControl.logout() : // destroy session
        this.setState({ userInputError: "Не удалось удалить учетную запись" });
    });

    socket.on("updateUser", (response: IResult) => {
      (response.result === "success") ?
        this.setState({ userNotification: "Обновлено" }) :
        this.setState({ userInputError: "Не удалось обновить учетную запись" });
    });
  }

  public componentWillUnmount() {
    const { socket } = this.props;

    if (socket) {
      socket.removeListener("deleteUser");
      socket.removeListener("updateUser");
    }
  }

  public render() {
    const { isChanged, invalidInputName, userInputError, userNotification } =
      this.state;
    const { user } = this.props;
    const popupMaxAge = 3000;

    if (!user)
      return null;

    return (
      <div className={ styles.ProfilePage }>
        <Form onSubmit={ this.updateAccount }>
          <label className={ styles.Field }>
            <div className={ styles.FieldName }>
              Email:
            </div>
            <div className={ styles.FieldInput }>
              <Input
                defaultValue={ user.email || "" }
                isInvalidInput={ (invalidInputName === "email") && true }
                name="email"
                onChange={ this.handleChange }
                onFocus={ this.makeInputValid }
                type="text" // I have my own email validation
              />
            </div>
          </label>
          <label className={ styles.Field }>
            <div className={ styles.FieldName }>
              Имя:
            </div>
            <div className={ styles.FieldInput }>
              <Input
                defaultValue={ user.name || "" }
                isInvalidInput={ (invalidInputName === "name") && true }
                onChange={ this.handleChange }
                onFocus={ this.makeInputValid }
                name="name"
                type="text"
              />
            </div>
          </label>
          <label className={ styles.Field }>
            <div className={ styles.FieldName }>
              Дата рождения:
            </div>
            <div className={ styles.FieldInput }>
              <Input
                defaultValue={
                  user.birthdate &&
                  Formatter.formatDate(new Date(user.birthdate)) || ""
                }
                name="birthdate"
                onChange={ this.handleChange }
                placeholder="дд.мм.гг"
                type="text"
              />
            </div>
          </label>
          <label className={ styles.Field }>
            <div className={ styles.FieldName }>Пол:</div>
            <div className={ styles.FieldInput }>
              <Select
                defaultValue={ user.sex || "unknown" }
                name="sex"
                onChange={ this.handleChange }
              >
                <option value="female">женский</option>
                <option value="male">мужской</option>
                <option value="unknown">не указано</option>
              </Select>
            </div>
          </label>
          <label className={ styles.Field }>
            <div className={ styles.FieldName }>
              Фотография:
            </div>
            <div className={ styles.FieldInput }>
              <img
                alt={ user.name }
                className={ styles.UserPicture }
                src={ user.picture }
              />
            </div>
          </label>
          <Button
            disabled={ (isChanged) ? false : true }
            isStretched={ true }
            type="submit"
          >Обновить</Button>
        </Form>

        <div className={ styles.Controls }>
          <NavLink to="/posts">Создать пост</NavLink>
          <a href="" onClick={ this.deleteAccount }>Удалить аккаунт</a>
          { /* posts, comments */ }
        </div>

        {
          (userInputError) ?
            <Popup close={ this.closePopup } options={{
              isOverlappable: true,
              isStretched: true,
              maxAge: popupMaxAge,
              theme: "error"
            }}>
              { userInputError }
            </Popup> :

          (userNotification) ?
            <Popup close={ this.closePopup } options={{
              isOverlappable: true,
              isStretched: true,
              maxAge: popupMaxAge,
              theme: "success"
            }}>
              { userNotification }
            </Popup> :

            null
        }

      </div>
    );
  }

  private closePopup = () =>
    this.setState({ userInputError: "", userNotification: "" })

  private deleteAccount() {
    // Ask: do you really wanna delete it?

    if (!this.props.socket)
      return console.error(`Profile component: didn't manage to delete`
      + ` account: "socket" prop is missing`);

    this.props.socket.emit("deleteUser");
  }

  // Are the any changes in the form?
  private handleChange = () => this.setState({ isChanged: true });

  // An input field must get rid of "error" state when focusing it.
  private makeInputValid(event: React.FocusEvent) {
    const { invalidInputName } = this.state;
    const target = event.target as HTMLInputElement;

    if (target.name === invalidInputName)
      this.setState({ invalidInputName: "" });
  }

  private updateAccount(event: React.FormEvent) {
    event.preventDefault();

    if (!this.props.socket)
      return console.error(`Profile component: didn't manage to update`
      + ` account: "socket" prop is missing`);

    const { isChanged } = this.state;
    const { target } = event;

    if (!target || !isChanged)
      return;

    const elems = (target as HTMLFormElement).elements as IProfileCollection;

    const data: IProfileCollectionData = {
      birthdate: elems.birthdate && elems.birthdate.value || null,
      email: elems.email && elems.email.value,
      name: elems.name && elems.name.value,
      picture: elems.picture && elems.picture.value,
      sex: elems.sex && elems.sex.value || null
    };

    try {
      this.validateInput(data);
    } catch (error) {
      return (error.name === "UserInputError") ?
        this.setState({ userInputError: error.message }) :
        console.error(error.message);
    }

    this.props.socket.emit("updateUser", data);
  }

  // Throws a specific error if there's an incorrect input.
  private validateInput(data: IProfileCollectionData) {
    const { birthdate, email, name, picture, sex } = data;

    if (typeof birthdate !== "string" && birthdate !== null) {
      throw new Error(`Неправильный тип данных: "Дата рождения"`);

    } else if (typeof email !== "string" || !isEmail(email)) {
      this.setState({ invalidInputName: "email" });
      throw new UserInputError("Пожалуйста, укажите корректный email");

    } else if (typeof name !== "string" || name.length === 0) {
      this.setState({ invalidInputName: "name" });
      throw new UserInputError("Пожалуйста, укажите имя");

    } else if (typeof picture !== "string" && picture !== undefined) {
      throw new Error(`Неправильный тип данных: "Фотография"`);

    } else if (typeof sex !== "string" && sex !== null) {
      throw new Error(`Неправильный тип данных: "Пол"`);
    }

    // "UserInputError" is an error which will be shown to the user via a
    // popup. A regular error is only displayed in the console.
  }
}