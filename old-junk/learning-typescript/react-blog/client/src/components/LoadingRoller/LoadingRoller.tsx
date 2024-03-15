import React, { FunctionComponent } from "react";
import styles from "./LoadingRoller.module.scss";

interface IProps {
  isFadingOut?: boolean;
}

// The animation is taken from [1].
const LoadingRoller: FunctionComponent<IProps> = (props: IProps) => (
  <div className={ [
    styles.LoadingRoller,
    (props.isFadingOut) ? styles.FadingOut : null
  ].join(" ") }>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default LoadingRoller;

// [1]: https://loading.io/css/