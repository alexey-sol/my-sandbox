import React, { FunctionComponent } from "react";
import styles from "./Button.module.scss";

interface IProps {
  disabled?: boolean;
  isStretched?: boolean;
  type?: "button" | "reset" | "submit";
}

const Button: FunctionComponent<IProps> = (props) => {
  const { disabled, isStretched, type } = props;

  return (
    <button
      className={ [
        styles.Button,
        (isStretched) ? styles.Stretched : null
      ].join(" ") }
      disabled={ (disabled) ? true : false }
      type={ (type) ? type : "submit" }
    >
      { props.children }
    </button>
  );
};

export default Button;