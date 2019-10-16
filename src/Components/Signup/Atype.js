import React, { Component } from 'react'
import '../../css/atype.css';

// function incrdecr()

export default class Atype extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return (
      <div className="input-component-container component-container">
        <div className="title-container content-container">
          <div className="sub-title atype-title">
            Associate Type
          </div>
        </div>
        <div className="atypes-description-container content-container">
          <div className="description">
            Please select the type of account that will be enrolled.
          </div>
        </div>
        <div id="associatetype-container" className="associatetype-container content-container">
          <div className={this.props.aType === 1 ? "associatetype associatetype-selected" : "associatetype"} onClick={(type) => this.props.updateAType(1)}>
            <div>Associate</div>
          </div>
          <div className={this.props.aType === 2 ? "associatetype associatetype-selected" : "associatetype"} onClick={(type) => this.props.updateAType(2)}>
            <div>Customer</div>
          </div>
        </div>
      </div>
    )
  }
}