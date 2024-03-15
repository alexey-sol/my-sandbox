import React, { FunctionComponent } from "react";
import styles from "./UserInfo.module.scss";

interface IProps {
  name: string;
  picture: string;
}

const UserInfo: FunctionComponent<IProps> = (props) => (
  <div className={ styles.UserInfo }>
    <img
      alt={ props.name }
      className={ styles.UserPicture }
      src={ props.picture }
    />
    <div className={ styles.Name }>
      { props.name }
    </div>
  </div>
);

export default UserInfo;