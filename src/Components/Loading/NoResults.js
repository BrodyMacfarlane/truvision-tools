import React, { Component } from 'react';

export default class Autoship extends Component {
  render(){
    return (
      <div>
        <div className="no-results-component">
          <div className="no-results-text">No results. :(<br/><span className="no-results-smaller-text">Please try another search keyword.</span></div>
        </div>
      </div>
    )
  }
}