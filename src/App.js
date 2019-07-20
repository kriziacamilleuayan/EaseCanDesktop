import React, { Component } from "react";
import Reviews from './components/review/Reviews'
import "./App.css";

import CameraFrame from "./components/camera/CameraFrame";
import AppManager from "./components/appmanager/AppManager";
import Spinner from "./components/spinner/Spinner";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <AppManager>
          <CameraFrame />
          <Reviews/>
        </AppManager>
      </div>
    );
  }
}
