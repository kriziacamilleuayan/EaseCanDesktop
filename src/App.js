import React, { Component } from "react";
import "./App.css";

import CameraFrame from "./components/camera/CameraFrame";
import AppManager from "./components/appmanager/AppManager";
import Spinner from "./components/spinner/Spinner";
import Splash from './components/splash/Splash'
import Reviews from './components/reviews/Reviews'
import Products from './components/products/Products'

export default class App extends Component {
  state = {
    viewSplash: true
  }
  hideSplash = () => {
    this.setState({ viewSplash: false })
  }
  render() {
    return (
      <div className="App">
        {this.state.viewSplash &&
          <Splash hideSplash={this.hideSplash} />
        }
        {/* {!this.state.viewSplash &&
          <AppManager>
            <CameraFrame />
          </AppManager>
        } */}
        {!this.state.viewSplash &&
          <Products/>
        }
      </div>
    );
  }
}
