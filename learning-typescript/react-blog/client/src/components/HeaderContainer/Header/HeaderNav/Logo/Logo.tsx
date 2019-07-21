import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Logo.module.scss";

const Logo: FunctionComponent<{}> = (props) => (
  <NavLink
    className={ styles.Logo }
    exact to="/"
    title="Уютненький Аркеика"
  >
    a
  </NavLink>
);

export default Logo;