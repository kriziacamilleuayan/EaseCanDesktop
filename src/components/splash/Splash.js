import React, {Component} from 'react';
import './Splash.css'

export default class Splash extends Component{
    state = {
        time: 3
    }
    componentDidMount(){
        console.log(window);
        this.timerID = setInterval(
            () => this.countdown(),
            1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
        console.log("Closing splash page...")
        this.props.hideSplash()
    }
    countdown(){
        if((this.state.time) > 0){
            this.setState({
                time: this.state.time-1
            })
            console.log(this.state.time); 
        }
        else{
            this.componentWillUnmount()
        }
    }
    render(){
        if(this.state.time > 0){
            return(
                <div className="main">
                    <img src="https://files.slack.com/files-pri/TLL41145S-FLNVD3MTQ/easecanlogo.png" className="logo" />
                </div>
            )
        }
        else{
            return null;
        }
    }
}