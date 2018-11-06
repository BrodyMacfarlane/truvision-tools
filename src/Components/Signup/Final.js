import React, { Component } from 'react';
import axios from 'axios';
import '../../css/final.css';
import clipBoi from '../../assets/SVG/clipboi.svg'

export default class Autoship extends Component {
  constructor(props){
    super(props)
    this.state = {
      shortenedLink: "",
      showCopiedText: false
    }
    this.shortenLink = this.shortenLink.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    this.setState({showCopiedText: true}, () => {
      setTimeout(() => {
        this.setState({showCopiedText: false})
      }, 2500)
    })
  }

  shortenLink(){
    axios.post('/api/getShortLink', {username: this.props.username, aType: this.props.aType, countryCode: this.props.countryCode, cart: this.props.cart})
      .then(response => {
        let resp = response.data.data
        this.setState({shortenedLink: resp.url})
      })
  }

  render(){
    return (
      <div className="final-component-container component-container">
        <div className="title-container content-container">
          <div className="sub-title final-title">
            Finalize
          </div>
        </div>
        <div className="final-description-container content-container">
          <div className="description">
            Please click the button below to generate your shareable bit.ly link.
          </div>
        </div>
        <div className="final-content-container">
          <button className="generate-link" onClick={this.shortenLink}>Generate bit.ly URL</button>
        </div>
        <div className="final-input-container">
          <div>
            <input id="url-input" readonly value={this.state.shortenedLink} ref={(textarea) => this.textArea = textarea} type="text"/>
          </div>
          <div className="clip-boi-container" onClick={this.copyToClipboard}>
            <img src={clipBoi} alt="" className="clip-boi"/>
          </div>
          {this.state.showCopiedText ? <div className="copied-text">Copied to clipboard!</div> : null}
        </div>
      </div>
    )
  }
}