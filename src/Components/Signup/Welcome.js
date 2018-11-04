import React, { Component } from 'react'
import '../../css/welcome.css';

// function incrdecr()

export default class Username extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return (
      <div className="welcome-component-container component-container">
        <div className="title-container content-container">
          <div className="title">
            Welcome!
          </div>
        </div>
        <div className="intro-container content-container">
          <div className="intro description">
            Welcome to TruVision Tools.  Here you will be able to set up an enrollment in a simple manner.  If you have any questions or comments, please send me an email at <span id="copy">Brody@truvisionhealth.com</span>.<br />Click "Get Started" below to set up a new account!
          </div>
        </div>
        <div className="circle-container content-container" onClick={this.props.incrementPage}>
          <svg viewBox="0 0 100 100">
            <circle fill="#000000" cx="50" cy="50" r="50" />
            <circle fill="#458CC8" cx="50" cy="50" r="40" />
          </svg>
          <div className="circle-text">
            GET STARTED
          </div>
        </div>
      </div>
    )
  }
}