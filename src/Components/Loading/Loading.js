import React, { Component } from 'react';

export default class Autoship extends Component {
  render(){
    return (
      <div>
        <div className="loading-component">
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <div className="loading-text">LOADING</div>
        </div>
      </div>
    )
  }
}