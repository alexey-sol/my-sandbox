import React, { FunctionComponent } from "react";
import styles from "./Link.module.scss";

interface IProps {
  href: string;
  target?: string;
}

const Link: FunctionComponent<IProps> = (props) => (
  <a
    className={ styles.Link }
    href={ props.href }
    target={ (props.target) ? props.target : "" }
  >
    { props.children }
  </a>
);

export default Link;