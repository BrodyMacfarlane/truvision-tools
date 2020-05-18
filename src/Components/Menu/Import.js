import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import '../../css/import.css';

export default class Import extends Component {
  constructor(props){
    super(props)
    this.state = {
      link: "",
      invalidLink: false,
      isSubmitting: false
    }
    this.updateLinkInputValue = this.updateLinkInputValue.bind(this)
    this.updatePaste = this.updatePaste.bind(this)
    this.importLink = this.importLink.bind(this)
    this.checkEnter = this.checkEnter.bind(this)
  }

  updateLinkInputValue(e){
    if(e.target.value === "" || /^[a-z0-9:./]+$/i.test(e.target.value)){
      this.setState({
        link: e.target.value
      })
    }
  }

  updatePaste(e){
    e.preventDefault()
    let newInputValue = e.clipboardData.getData('Text')
    this.setState({link: newInputValue});
  }
  
  checkEnter(e){
    if(e.key === "Enter"){
      this.importLink()
    }
  }

  importLink(){
    this.setState({isSubmitting: true, invalidLink: false})
    let splitLink = this.state.link.split("/")
    let reformLink = splitLink[splitLink.length - 1].length > 0 ? splitLink[splitLink.length - 1] : splitLink[splitLink.length - 2]
    axios.post("https://truvis.io/api/importLink", {shorturl: reformLink})
      .then(response => {
        if(!response.data.url || response.data.url.length === 0 || !response.data.url.split("https://shop.truvisionhealth.com/")[1]){
          this.setState({invalidLink: true})
        }
        else {
          let longLink = response.data.url
          let username = (longLink.split("https://shop.truvisionhealth.com/")[1].split("/")[0]).toString()
          let associatetype = parseInt(longLink.split("type=")[1].split("&countrycode=")[0])
          let countrycode = (longLink.split("&countrycode=")[1].split("&language=")[0]).toString()
          let cart = JSON.parse(longLink.split("&products=")[1])
          let language = longLink.split("&language=")[1].split("-")[0]
          this.props.importLink(username, associatetype, countrycode, cart, language)
        }
      })
  }

  render(){
    return (
      <div className="import-component-container">
        <div className="title-container content-container">
          <div className="sub-title import-title">
            Test TruVis.io Link
          </div>
        </div>
        <div className="import-description-container content-container">
          <div className="description">
            Please paste your truvis.io link in the input box below.
          </div>
        </div>
        <div className="import-input-container">
          <div className="import-input-outer">
            <input id="import-input" value={this.state.link} onChange={e => this.updateLinkInputValue(e)} onKeyPress={this.checkEnter} placeholder="PASTE OR TYPE HERE" type="text" maxLength="30" onPaste={(e) => this.updatePaste(e)}/>
          </div>
        </div>
        {
          !this.state.isSubmitting ?
            <div className="import-submit-cancel-container">
              <div className="cancel-btn import-btn" onClick={this.props.hideImport}>CANCEL</div>
              <div className="submit-btn import-btn" onClick={this.importLink}>SUBMIT</div>
            </div>
          : null
        }
        {
          this.state.invalidLink ?
            <div className="import-description-container content-container invalid-link-import">Invalid link input, please double check and try again.  This is most likely due to being a link older than December 2019, but if you suspect an issue, please email Web@truvisionhealth.com.</div>
          : null
        }
        {
          this.state.isSubmitting && !this.state.invalidLink ?
            <div id="import-loading-container"><Loading/></div>
          : null
        }
      </div>
    )
  }
}