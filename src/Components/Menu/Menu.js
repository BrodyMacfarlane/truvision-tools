import React, { Component } from 'react'
import '../../css/menu.css';

// function incrdecr()

export default class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return (
      <div className="menu-component-container">
        <div className="menu-triangle"></div>
        <div className="menu-component">
          <div onClick={this.props.returnHome} className="menu-component-item">Start Over</div>
          <div onClick={this.props.showImport} className="menu-component-item">Read/Import Existing URL</div>
        </div>
      </div>
    )
  }
}