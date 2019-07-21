import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import ContextMenu from "Components/ContextMenu/ContextMenu";

interface IProps {
  toggle: () => void;
  logout(): void;
}

const UserMenu: FunctionComponent<IProps> = (props) => (
  <ContextMenu toggle={ props.toggle }>
    <li>
      <NavLink to="/profile">Профиль</NavLink>
    </li>
    <li>
      <NavLink
        exact to="/"
        onClick={ props.logout }
      >
        Выйти
      </NavLink>
    </li>
  </ContextMenu>
);

export default UserMenu;