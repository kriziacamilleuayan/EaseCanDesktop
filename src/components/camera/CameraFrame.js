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
        <div>
          <input
            type="text"
            value={this.props.allergy}
            placeholder="Enter Allergy"
            onChange={e => this.props.allergyOnChange(e.target.value)}
            style={{
              position: 'absolute',
              zIndex: '2',
              width: "300px",
              height: "14px",
              bottom: '0',
              margin: '2em'
            }}
          />
        </div>
      </Fragment>
    );
  }
}

export default withGlobalSettings(CameraFrame);
