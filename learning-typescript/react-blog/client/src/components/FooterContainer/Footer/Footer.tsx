import React from "react";
import { NavLink } from "react-router-dom";
import FooterLine from "./FooterLine/FooterLine";
import styles from "./Footer.module.scss";

export default class Footer extends React.Component {
  public render() {
    const GithubUrl = "https://github.com/LetsCerebrate/react-blog/";
    const postnaukaUrl = "https://postnauka.ru/";

    return (
      <div className={ styles.Footer }>
        <FooterLine centeredText={ true }>
          <NavLink className={ styles.FooterLink } exact to="/">
            Уютненький Аркеика.
          </NavLink>
          &nbsp;All rites reversed. { new Date().getFullYear() }.
        </FooterLine>
        <FooterLine
          centeredText={ true }
          darkTheme={ true }
          isHideable={ true }
        >
          Это <a className={ styles.FooterLink } href={ GithubUrl } target=
          "_blank">небольшой учебный проект</a>, SPA-приложение. Написано на
          TypeScript. На клиенте используется React (ради которого, собственно,
          все и затевалось), на серверной части тарахтит Node, заправленный
          Express'ом. Визуальный стиль позаимствован в основном у этого
          замечательного ресурса: &laquo;<a className={ styles.FooterLink }
          href={ postnaukaUrl } target="_blank">ПостНаука</a>&raquo;. Это
          же не плагиат, правда? Я честно признался.
        </FooterLine>
      </div>
    );
  }
}