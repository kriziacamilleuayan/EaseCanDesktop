import React, { Component, Fragment } from "react";
import "./CameraFrame.css";
import { withGlobalSettings } from "../appmanager/AppContext";

class CameraFrame extends Component {
  componentDidMount() {
    this.props.applyCamera();
  }

  render() {
    const { facingMode } = this.props;
    return (
      <Fragment>
        <video id="cameraSceneView" autoPlay playsInline muted />
        <div id="cameraSceneRects" />
        <div id="cameraOpWrap" />
      </Fragment>
    );
  }
}

export default withGlobalSettings(CameraFrame);
