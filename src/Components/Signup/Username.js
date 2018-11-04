import React, { Component } from 'react'
import '../../css/username.css'

export default class Username extends Component {
  constructor(props){
    super(props)
    this.state = {
      usernameInputValue: ""
    }
    this.checkEnter = this.checkEnter.bind(this)
  }

  componentDidMount(){
    this.setState({usernameInputValue: this.props.username})
  }

  checkEnter(e){
    if(e.key === "Enter"){
      this.props.incrementPage()
    }
  }

  updateUsernameInputValue(e){
    if(e.target.value === ""){
      this.setState({
        usernameInputValue: e.target.value
      }, () => {
        this.props.updateUsername(this.state.usernameInputValue)
      })
    } else if(/^[a-z0-9]+$/i.test(e.target.value)){
      this.setState({
        usernameInputValue: e.target.value
      }, () => {
        this.props.updateUsername(this.state.usernameInputValue)
      })
    }
  }

  render(){
    return (
      <div className="input-component-container component-container">
        <div className="title-container content-container">
          <div className="sub-title">
            USERNAME
          </div>
        </div>
        <div className="input-description-container content-container">
          <div className="description">
            Please enter the username you use to login to the TruVision BackOffice.
          </div>
        </div>
        <div className="input-container content-container">
          <input value={this.props.username} onKeyPress={this.checkEnter} onChange={e => this.updateUsernameInputValue(e)} type="text" placeholder="Type here" className="username-input"/>
        </div>
      </div>
    )
  }
}