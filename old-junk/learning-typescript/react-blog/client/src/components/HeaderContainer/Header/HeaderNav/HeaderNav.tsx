import React, { FunctionComponent } from "react";
import Logo from "./Logo/Logo";
import NavTab from "./NavTab/NavTab";
import styles from "./HeaderNav.module.scss";

const HeaderNav: FunctionComponent<{}> = () => (
  <ul className={ styles.HeaderNav }>
    <Logo />
    <NavTab href="/">
      Главная
    </NavTab>
    <NavTab href="/archive">
      Архив
    </NavTab>
  </ul>
);

export default HeaderNav;