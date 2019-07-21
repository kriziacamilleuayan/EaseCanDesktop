import React, { Component, Fragment } from "react";
import { Provider } from "./AppContext";
import { Logger } from "../../logger/Logger";
import API from "../../low/API";

export default class AppManager extends Component {
  state = {
    model: null,
    gettingModel: true,
    cameraDOM: false,
    currentStream: null,
    intervalID: null,
    facingMode: "",
    largest: {}
  };

  componentDidMount() {
    API.getModel()
      .then(res => {
        if (res) Logger.log("Successfully fetched model");
        this.setState({ model: res });
        this.startAnalyzing();
      })
      .catch(err => {
        Logger.log(err);
      });
  }

  scanAgain = () => {
    this.startAnalyzing();
  };

  forCameraResize = () => {
    const video = document.getElementById("cameraSceneView");
    if (!video) return;
    video.width = window.innerWidth;
    video.height = window.innerHeight;
  };

  applyCamera = () => {
    this.setState({ cameraDOM: true });
    Logger.log("Camera frame is now mounted");
    Logger.log("Applying DOM dimensions");

    window.document.addEventListener("resize", this.forCameraResize);
    Logger.log("Attached camera resize listener");
    /* Setting up camera called from low API */
    API.autoSetupCamera()
      .then(res => {
        Logger.log(res.message);
        this.setState({
          currentStream: res.stream,
          facingMode: String(res.constraints.facingMode)
        });
      })
      .catch(err => {
        Logger.log(err.message);
        this.setState({ facingMode: "", currentStream: null });
      });
  };

  setCurrentStream = stream => {
    this.setState({ currentStream: stream });
  };

  startAnalyzing = async () => {
    const localizeModel = await this.state.model;
    const data = await API.startPredicting(localizeModel, this.setLargest);
    if (typeof this.state.largest["score"] !== "undefined") {
      document.getElementById("cameraSceneRects").innerHTML = "";
      console.log("An item was found");
      this.props.setHasDetected(true);
      return;
    }
    if (data) this.startAnalyzing();
  };

  setLargest = lar => {
    this.setState({ largest: lar });
  };

  render() {
    return (
      <Fragment>
        <Provider
          value={{
            applyCamera: this.applyCamera,
            ...this.state,
            scanAgain: this.scanAgain,
            setHasDetected: this.props.setHasDetected
          }}
        >
          {this.props.children}
        </Provider>
      </Fragment>
    );
  }
}
