import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavTab.module.scss";

interface IProps {
  href: string;
}

const NavTab: FunctionComponent<IProps> = (props) => (
  <li className={ styles.NavTab }>
    <NavLink
      className={ styles.NavLink }
      activeClassName={ styles.active }
      exact={ (props.href === "/") ? true : false }
      to={ props.href }
    >
      { props.children }
    </NavLink>
  </li>
);

export default NavTab;