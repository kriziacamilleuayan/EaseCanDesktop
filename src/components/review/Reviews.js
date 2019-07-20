import React, {Component} from 'react';
import {withGlobalSettings} from '../appmanager/AppContext'

class Reviews extends Component {

  state = {
    data: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    console.log("nextProps", nextProps)
    return {
      data: nextProps.largest,
      // ... other derived state properties
    };
  }

  render(){
    console.log("what", this)
    return (
      <>
        hello
      </>
    )
  }
}

export default withGlobalSettings(Reviews);