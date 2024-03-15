import React from "react";
import styles from "./ContextMenu.module.scss";

interface IProps {
  className?: string;
  toggle: () => void;
}

export default class ContextMenu extends React.Component<IProps> {
  private contextMenuRef: React.RefObject<HTMLUListElement>;

  constructor(props: IProps) {
    super(props);
    this.contextMenuRef = React.createRef();
  }

  public componentDidMount() {
    document.addEventListener("click", this.props.toggle);
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.props.toggle);
  }

  public render = () => (
    <ul
      ref={ this.contextMenuRef }
      className={ this.props.className || styles.ContextMenu }
    >
      { this.props.children }
    </ul>
  )
}