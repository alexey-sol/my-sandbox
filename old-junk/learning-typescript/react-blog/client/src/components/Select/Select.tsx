import React, { FunctionComponent } from "react";
import styles from "./Select.module.scss";

interface IProps {
  defaultValue: string;
  name: string;
  onChange: any;
}

const Select: FunctionComponent<IProps> = (props) => (
  <select
    className={ styles.Select }
    defaultValue={ props.defaultValue }
    name={ props.name }
    onChange={ props.onChange }
  >
    {props.children}
  </select>
);

export default Select;