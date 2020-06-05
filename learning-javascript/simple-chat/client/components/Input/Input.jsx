import styles from "./Input.module.css";

const Input = (props) => (
  <input
    className={ styles.Input }
    defaultChecked={ props.checked }
    defaultValue={ props.defaultValue }
    name={ props.name }
    placeholder={ props.placeholder }
    style={ props.style }
    type={ props.type }
  />
);

export default Input;