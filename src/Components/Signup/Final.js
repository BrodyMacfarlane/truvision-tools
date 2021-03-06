import React, { Component } from 'react';
import axios from 'axios';
import '../../css/final.css';
import clipBoi from '../../assets/SVG/clipboi.svg'

export default class Final extends Component {
  constructor(props){
    super(props)
    this.state = {
      shortenedLink: "",
      showCopiedText: false,
      generatedCart: []
    }
    this.shortenLink = this.shortenLink.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.highlightLink = this.highlightLink.bind(this)
    this.copyText = this.copyText.bind(this)
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
    if(this.state.generatedCart !== this.props.cart){
      axios.post('/api/getShortLink', {username: this.props.username, aType: this.props.aType, countryCode: this.props.countryCode, cart: this.props.cart, languagePref: this.props.languagePref ? this.props.languagePref : 'en'})
        .then(response => {
          let resp = response.data
          this.setState({shortenedLink: resp.url, generatedCart: this.props.cart})
        })
    }
  }

  highlightLink(input){
    let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i)
    if(!isiOSDevice) {
      input.setSelectionRange(0, input.value.length)
      this.copyText()
    }
    else {
      var range = document.createRange();
      range.selectNodeContents(input);

      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      setTimeout(() => {
        input.setSelectionRange(0, 9999);
        this.copyText()
      }, 10)
    }
  }

  copyText(){
    document.execCommand('copy')
    this.setState({showCopiedText: true}, () => {
      setTimeout(() => {
        this.setState({showCopiedText: false})
      }, 2500)
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
            Please click the button below to generate your shareable truvis.io link.
          </div>
        </div>
        <div className="final-content-container">
          <button disabled={this.state.generatedCart === this.props.cart} className="generate-link" onClick={this.shortenLink}>Generate truvis.io URL</button>
        </div>
        <div className="final-input-container">
          <div className="url-input-container">
            <input onClick={(input) => this.highlightLink(this.textArea)} id="url-input" value={this.state.shortenedLink} ref={(textarea) => this.textArea = textarea} type="text"/>
          </div>
          <div className="clip-boi-container" onClick={this.copyToClipboard}>
            <img src={clipBoi} alt="" className="clip-boi"/>
          </div>
          {/* <div id="unshortened-description-container" className="content-container">
            <div className="description">
              <div>Alternatively, you can use this unshortened link:</div>
              <div className="unshortened-link">
                <input onClick={(input) => this.highlightLink(this.longLink)} ref={(input) => {this.longLink = input}} className="unshortened-link-input" value={`https://secure.truvisionhealth.com/#/${this.props.username}/Application?${this.props.aType === 1 ? "cpn=tvt&" : ""}type=${this.props.aType}&countrycode=${this.props.countryCode}&language=en-us&products=${JSON.stringify(this.props.cart)}`} type="text"/>
              </div>
            </div>
          </div> */}
          {this.state.showCopiedText ? <div className="copied-text">Copied to clipboard!</div> : null}
        </div>
      </div>
    )
  }
}