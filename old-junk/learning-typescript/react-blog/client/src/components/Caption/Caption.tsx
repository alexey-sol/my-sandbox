import React, { FunctionComponent } from "react";
import styles from "./Caption.module.scss";

const Caption: FunctionComponent<{}> = (props) => (
  <p className={ styles.Caption }>
    { props.children }
  </p>
);

export default Caption;