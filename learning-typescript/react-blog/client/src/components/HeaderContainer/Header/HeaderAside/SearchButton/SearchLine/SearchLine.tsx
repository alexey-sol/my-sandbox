import React, { FunctionComponent } from "react";
import styles from "./SearchLine.module.scss";

interface IProps {
  id?: string;
  handleKeyDown(event: React.KeyboardEvent): void;
}

const SearchLine: FunctionComponent<IProps> = (props) => (
  <div className={ styles.SearchLine }>
    <input
      id={ props.id }
      className={ styles.SearchInput }
      placeholder="Поиск"
      autoFocus
      onKeyDown={ props.handleKeyDown }
    />
  </div>
);

export default SearchLine;