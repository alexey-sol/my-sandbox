import React from "react";
import IIndexer from "Types/IIndexer";
import styles from "./Input.module.scss";

interface IProps {
  defaultValue?: string;
  isInvalidInput?: boolean; // [1]
  name: string;
  onChange?: () => void;
  onFocus?: (event: React.FocusEvent) => void;
  placeholder?: string;
  style?: IIndexer<any>;
  type: string;
}

interface IState {
  isFocused: boolean;
}

export default class Input extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.state = { isFocused: false };
  }

  public render() {
    const { defaultValue, isInvalidInput, name, onChange, placeholder, style,
      type } = this.props;
    const { isFocused } = this.state;

    return (
      <div
        className={ [
          styles.Container,
          (isFocused) ? styles.ContainerFocused : null,
          (isInvalidInput === true) ? styles.Invalid : null
        ].join(" ") }
      >
        <input
          className={ styles.Input }
          defaultValue={ defaultValue }
          name={ name }
          onBlur={ this.blur }
          onChange={ onChange }
          onFocus={ this.focus }
          placeholder={ placeholder }
          style={ style }
          type={ type }
        />
      </div>
    );
  }

  private blur = () => this.setState({ isFocused: false });

  private focus = (event: React.FocusEvent) => {
    const { onFocus } = this.props;

    if (onFocus)
      onFocus(event);

    this.setState({ isFocused: true });
  }
}

// [1]. "isInvalidInput" is a prop which acts like a state. It's a bad practice
// (that is, props shouldn't behave like that), but I just didn't come up with
// a better solution here.