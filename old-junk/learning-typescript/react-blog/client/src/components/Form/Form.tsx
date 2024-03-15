import React, { FunctionComponent } from "react";
import styles from "./Form.module.scss";

interface IProps {
  onSubmit(event: React.FormEvent): void;
}

const Form: FunctionComponent<IProps> = (props) => {
  const children = React.Children.toArray(props.children);

  return (
    <form className={ styles.Form } onSubmit={ props.onSubmit }>
      {
        children.map((node, index) => (
          <div className={ styles.Row } key={ index }>
            { node }
          </div>
        ))
      }
    </form>
  );
};

export default Form;