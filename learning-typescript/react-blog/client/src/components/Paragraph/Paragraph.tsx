import React, { FunctionComponent } from "react";
import styles from "./Paragraph.module.scss";

const Paragraph: FunctionComponent<{}> = (props) => (
  <p className={ styles.Paragraph }>
    { props.children }
  </p>
);

export default Paragraph;