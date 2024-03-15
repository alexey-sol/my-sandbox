import React, { FunctionComponent } from "react";
import styles from "./FooterLine.module.scss";

interface IProps {
  centeredText?: boolean;
  darkTheme?: boolean;
  isHideable?: boolean;
}

const FooterLine: FunctionComponent<IProps> = (props) => {
  const { centeredText, darkTheme, isHideable } = props;

  return (
    <div className={[
      styles.FooterLine,
      (centeredText) ? styles.CenteredText : null,
      (darkTheme) ? styles.DarkTheme : null,
      (isHideable) ? "Hideable" : null
    ].join(" ")}>
      { props.children }
    </div>
  );
};

export default FooterLine;