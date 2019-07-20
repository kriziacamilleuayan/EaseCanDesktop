import React, {Component} from 'react';
import { withGlobalSettings } from '../appmanager/AppContext'
import Modal from 'react-modal';
import '../review/Review.css'

class Reviews extends Component {

  state = {
    largest: {},
    modalIsOpen: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    if(JSON.stringify(nextProps.largest) !== JSON.stringify(prevState.largest)){
      console.log("nextProps", nextProps.largest, prevState.largest)
      return { largest: nextProps.largest, modalIsOpen: true }
    }
    return;
  }

  render(){
    return (
      <>
         <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.setState({modalIsOpen: false})}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal} style={customStyles.close}>x</button>
          <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.largest.class}</h2>
          {/* input data to map here */}
        </Modal>
      </>
    )
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    height                : '-webkit-fill-available',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: "90%"
  },
  close:  {
    float: 'right',
    backgroundColor: "transparent",
    border: 'none'
  }
};



export default withGlobalSettings(Reviews);