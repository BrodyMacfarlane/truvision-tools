import React, { Component } from 'react';
import '../../css/animation.css';
import bigLogo from '../../assets/big-logo.png';

export default class Animation extends Component {
  constructor(props){
    super(props)
    
  }
  render(){
    return (
      <div>
        <div className={this.props.isAnimating ? "animation-circle-container animation1-circle" : "invisible"}>
          <svg className="animation-svg">
            <circle className="animation-circle" fill="#458CC8" cx="200" cy="200" r="200" />
          </svg>
        </div>
        <div className={this.props.isAnimating2 ? "animation-circle-container animation2-circle" : "invisible"}>
          <svg className="animation-svg">
            <circle className="animation-circle" fill="#FFFFFF" cx="200" cy="200" r="200" />
          </svg>
        </div>
        <div className={this.props.isAnimating || this.props.isAnimating2 ? "animation-logo-container animation-circle-container" : "invisible"}>
          <img src={bigLogo} alt=""/>
        </div>
      </div>
    )
  }
}