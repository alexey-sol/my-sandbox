import React, { Component } from "react";
import styles from "./Video.module.css";

// "label" prop is a label (some text) emerging atop of the video element.

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.updateVideoStream = this.updateVideoStream.bind(this);
  }

  componentDidMount() {
    this.updateVideoStream();
  }

  componentDidUpdate() {
    this.updateVideoStream()
  }

  // It's a slightly complicated matter to define video's "srcObject" in React.
  // This is a workaround: define the property via refs.
  updateVideoStream() {
    const { stream } = this.props;
    const video = this.videoRef.current;

    if (video && video.srcObject !== stream) {
      video.srcObject = stream;
    }
  }

  render() {
    const { videoRef } = this;
    const { label } = this.props;

    return (
      <div className={ styles.Container }>
        <video
          autoPlay
          playsInline
          ref={ videoRef }
        />

        {
          label && <div className={ styles.Description }>
            { label }
          </div>
        }
      </div>
    );
  }
}