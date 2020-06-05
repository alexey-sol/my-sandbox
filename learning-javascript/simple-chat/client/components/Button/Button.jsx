import styles from "./Button.module.css";

const Button = (props) => (
  <button
    className={ styles.Button }
    disabled={ props.disabled }
    onClick={ props.onClick }
    style={ props.style }
    title={ props.title }
    type={ (props.type) ? props.type : "submit" }
  >
    { props.children }
  </button>
);

export default Button;