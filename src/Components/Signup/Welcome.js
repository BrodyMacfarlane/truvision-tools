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
            Welcome to TruVisionTools.  Go through the steps to generate your custom link and share that with your new enrollment.  By using your TruVisionTools link (truvis.io) to enroll as an Associate, they will receive a discount on their enrollment fee.  If you have any questions or comments, please send an email to <span id="copy">Web@truvisionhealth.com</span>.<br />Click "Get Started" below to set up a new account!
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