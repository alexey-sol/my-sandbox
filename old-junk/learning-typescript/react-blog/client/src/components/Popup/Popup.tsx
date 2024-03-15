import React from "react";
import ReactDOM from "react-dom";
import IconClose from "Components/IconClose/IconClose";
import styles from "./Popup.module.scss";

interface IPopupOptions {
  isOverlappable?: boolean;
  isStretched?: boolean;
  maxAge?: number; // ms; if it's not specified, the popup won't expire
  theme?: "error" | "normal" | "success";
}

interface IProps {
  close?: () => void; // tells the parent when the popup is closed
  options?: IPopupOptions;
}

interface IState {
  isShown: boolean;
}

// Creates a popup and attaches it to the document's body.
export default class Popup extends React.Component<IProps, IState> {
  private timerId: number = 0;

  constructor(props: IProps) {
    super(props);
    this.state = { isShown: true };
  }

  public componentDidMount() {
    const { isShown } = this.state;
    const { close, options } = this.props;
    const maxAge = options && options.maxAge;

    if (isShown && maxAge && !this.timerId) {
      this.timerId = window.setTimeout(() => {
        if (close)
          close();
      }, maxAge);
    }
  }

  public componentWillUnmount() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  public render() {
    const { options } = this.props;
    const isOverlappable = options && options.isOverlappable;
    const isStretched = options && options.isStretched;
    const theme = options && options.theme;

    return ReactDOM.createPortal(
      this.createElem(isOverlappable, isStretched, theme),
      document.body
    );
  }

  private createElem = (
    isOverlappable?: boolean,
    isStretched?: boolean,
    theme?: string) =>
  (
    <React.Fragment>
      {
        this.state.isShown &&

        <div className={ [
          styles.Popup,
          (isOverlappable) ? styles.Overlappable : null,
          (isStretched) ? styles.Stretched : null,
          (theme === "error") ? styles.Error :
            (theme === "success") ? styles.Success : null
        ].join(" ") }>

          <p className={ styles.Text }>
            { this.props.children }
          </p>

          <button
            className={ styles.CloseButton }
            onClick={ this.props.close }
          >
            <IconClose size="18px" className={ styles.IconClose }/>
          </button>
        </div>
      }
    </React.Fragment>
  )
}