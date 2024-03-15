import React, { FunctionComponent } from "react";
import styles from "./IconArrow.module.scss";

interface IProps {
  className?: string;
  size?: string;
}

const IconArrow: FunctionComponent<IProps> = (props) => (
  <svg
    className={ props.className || styles.IconArrow }
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 459 459"
    width={ props.size || "22px" }
    height={ props.size || "22px" }
  >
    <path d="M459,216.75L280.5,38.25v102c-178.5,25.5-255,153-280.5,280.5C63.75,331.5,153,290.7,280.5,290.7v104.55L459,216.75z"/>
  </svg>
);

export default IconArrow;