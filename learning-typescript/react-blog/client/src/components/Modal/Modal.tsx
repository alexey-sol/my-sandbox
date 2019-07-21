import React from "react";
import ReactDOM from "react-dom";
import IconClose from "Components/IconClose/IconClose";
import styles from "./Modal.module.scss";

interface IModalOptions {
  hasCloseButton?: boolean;
  isAltBackground?: boolean;
  isFadingIn?: boolean;
  isFadingOut?: boolean;
  isFullscreen?: boolean;
  isOverlappable?: boolean;
}

interface IProps {
  options?: IModalOptions;
  toggle?: () => void;
}

// Creates a modal and attaches it to the document's body.
export default class Modal extends React.Component<IProps> {
  private modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.modalRef = React.createRef();
  }

  public render() {
    const { options } = this.props;

    const hasCloseButton = options && options.hasCloseButton || false;
    const isAltBackground = options && options.isAltBackground || false;
    const isFadingIn = options && options.isFadingIn || false;
    const isFadingOut = options && options.isFadingOut || false;
    const isFullscreen = options && options.isFullscreen || false;
    const isOverlappable = options && options.isOverlappable || false;

    return ReactDOM.createPortal(
      this.createModal(hasCloseButton, isAltBackground, isFullscreen,
        isFadingIn, isFadingOut, isOverlappable),
      document.body
    );
  }

  private closeModal(event: React.MouseEvent) {
    const { toggle } = this.props;

    if (!toggle) return;

    const target = event.target && (event.target as HTMLElement);
    const container = this.modalRef.current;
    const closeButton = container &&
      container.getElementsByClassName(styles.CloseButton)[0];

    if (!target || !container || !closeButton) return;

    if (closeButton.contains(target) || target === container)
      toggle();
  }

  private createModal(
    hasCloseButton?: boolean,
    isAltBackground?: boolean,
    isFullscreen?: boolean,
    isFadingIn?: boolean,
    isFadingOut?: boolean,
    isOverlappable?: boolean
  ) {
    return (
      <div
        ref={ this.modalRef }
        className={ [
          styles.Container,
          (isFadingIn) ? styles.FadingIn : null,
          (isFadingOut) ? styles.FadingOut : null,
          (isOverlappable) ? styles.Overlappable : null
        ].join(" ") }
        onClick={ this.closeModal }
      >
        <div className={ [
          styles.Modal,
          (isAltBackground) ? styles.AltBackground : null,
          (isFullscreen) ? styles.Fullscreen : null
        ].join(" ") }>

          {
            hasCloseButton &&

            <button
              className={ styles.CloseButton }
              onClick={ this.closeModal }
            >
              <IconClose className={ styles.IconClose }/>
            </button>
          }

          <div className={ styles.Content }>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}