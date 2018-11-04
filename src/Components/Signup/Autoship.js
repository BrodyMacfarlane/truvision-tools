import React, { Component } from 'react'
import '../../css/autoship.css';

// function incrdecr()

export default class Autoship extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return (
      <div className="autoship-component-container component-container">
        <div className="title-container content-container">
          <div className="sub-title autoship-title">
            ORDER TYPE
          </div>
        </div>
        <div className="autoship-description-container content-container">
          <div className="description">
            Please select the type of order for this enrollment.
          </div>
        </div>
        <div className="autoship-container content-container">
          <div className={this.props.autoship === false ? "associatetype associatetype-selected" : "associatetype"} onClick={(type) => this.props.updateAutoship(false)}>
            <div>Regular Order</div>
          </div>
          {this.props.aType !== 2 ? <div className={this.props.autoship === true ? "associatetype associatetype-selected" : "associatetype"} onClick={(type) => this.props.updateAutoship(true)}>
            <div>Smartship Order</div>
          </div> : null }
        </div>
      </div>
    )
  }
}