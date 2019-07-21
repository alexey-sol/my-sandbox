import React, { FunctionComponent } from "react";
import styles from "./ButtonContainer.module.scss";

const ButtonContainer: FunctionComponent<{}> = (props) => (
  <div className={ styles.ButtonContainer }>
    { props.children }
  </div>
);

export default ButtonContainer;