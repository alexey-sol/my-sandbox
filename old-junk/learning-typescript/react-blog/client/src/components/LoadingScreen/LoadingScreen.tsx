import React, { FunctionComponent } from "react";
import LoadingRoller from "../LoadingRoller/LoadingRoller";
import Modal from "Components/Modal/Modal";

const LoadingScreen: FunctionComponent<{}> = () => (
  <Modal options={{
    isAltBackground: true,
    isFullscreen: true,
    isOverlappable: true
  }}>
    <LoadingRoller />
  </Modal>
);

export default LoadingScreen;