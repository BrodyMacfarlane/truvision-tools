import React, { Component } from 'react';
import axios from 'axios';
import '../../css/summary.css';

const languages = {
  en: "English",
  es: "Español"
}

export default class Summary extends Component {
  constructor(props){
    super(props)
    this.state = {
      autoship: [],
      enroll: [],
      productInfo: {}
    }
    this.updateUsernameInputValue = this.updateUsernameInputValue.bind(this)
    this.refreshCart = this.refreshCart.bind(this)
  }

  componentDidMount(){
    this.refreshCart()
  }

  componentWillReceiveProps(){
    this.refreshCart()
  }

  refreshCart(){
    if(this.props.cart.length > 0){
      let autoshiparr = []
      let enrollarr = []
      let itemidstoget = []
      let productInfoPregame = {}
      this.props.cart.forEach((item) => {
        if (item.autoshipqty > 0) {
          autoshiparr.push(item.itemcode)
        }
        if (item.orderqty > 0) {
          enrollarr.push(item.itemcode)
        }
      })
      this.setState({autoship: autoshiparr}, () => {
        this.setState({enroll: enrollarr}, () => {
          itemidstoget.push(...new Set(autoshiparr.concat(enrollarr)))
          axios.get('/api/getProductsFromIDs')
            .then(response => {
              let arr2Clean = response.data
              arr2Clean.map((item) => {
                if(itemidstoget.indexOf(item.itemid) > -1){
                  productInfoPregame[item.itemid] = [item.productname, item.sku, item.image]
                }
              })
              this.setState({productInfo: productInfoPregame})
            })
        })
      })
    }
  }

  updateUsernameInputValue(e){
    if(e.target.value === "" || /^[a-z0-9]+$/i.test(e.target.value)){
      this.setState({
        usernameInputValue: e.target.value
      }, () => {
        this.props.updateUsername(this.state.usernameInputValue)
      })
    }
  }

  render(){
    return (
      <div className="summary-component-container component-container">
        <div className="title-container content-container">
          <div className="sub-title summary-title">
            Summary
          </div>
        </div>
        <div className="summary-description-container content-container">
          <div className="description">
            Please review the following information.  You may need to scroll down to see the entire contents of the cart.
          </div>
        </div>
        <div className="summary-container">
          <div className="username-summary-container summary-container">
            <div className="summary-wrapper">
              <div className="summary-description">Username</div>
              <div className="summary-change"><span id="not-bold">(<span className="change-summary" onClick={() => this.props.setPage(1, false)}>change</span>)</span></div>
            </div>
            <div className="summary-info">{this.props.username}</div>
          </div>
          <div className="country-summary-container summary-container">
            <div className="summary-wrapper">
              <div className="summary-description">Language & Country</div>
              <div className="summary-change"><span id="not-bold">(<span className="change-summary" onClick={() => this.props.setPage(2, false)}>change</span>)</span></div>
            </div>
            <div className="summary-info">{languages[this.props.languagePref] ? languages[this.props.languagePref] : "Invalid language.  Please go back and select an option."}</div>
            <div className="summary-info">{this.props.countryCode}</div>
          </div>
          <div className="cart-summary-container summary-container">
            <div className="summary-wrapper">
              <div className="summary-description">Cart</div>
              <div className="summary-change"><span id="not-bold">(<span className="change-summary" onClick={() => this.props.setPage(3, true)}>change</span>)</span></div>
            </div>
            <div className="summary-info-title">Enrollment Order</div>
            <div className="summary-info">
              {
                this.props.cart.length && this.props.cart.reduce((a, b) => {
                  return {orderqty: a.orderqty + b.orderqty}
                }).orderqty > 0
                ?
                this.props.cart.map((item, i) => {
                  if (item.orderqty > 0) {
                    if(this.state.productInfo[item.itemcode]){
                      return (
                        <div key={i} className="summary-cart-product">SKU {this.state.productInfo[item.itemcode][1]} <span id="green-hyphen">-</span> {this.state.productInfo[item.itemcode][0]}</div>
                      )
                    }
                  }
                })
                :
                <div className="summary-cart-product">None</div>
              }
            </div>
            <div className="summary-info-title">Subscription</div>
            <div className="summary-info">
              {
                this.props.cart.length && this.props.cart.reduce((a, b) => {
                  return {autoshipqty: a.autoshipqty + b.autoshipqty}
                }).autoshipqty > 0
                ?
                this.props.cart.map((item, i) => {
                  if (item.autoshipqty > 0) {
                    if(this.state.productInfo[item.itemcode]){
                      return (
                        <div key={i} className="summary-cart-product">SKU {this.state.productInfo[item.itemcode][1]} <span id="green-hypen">-</span> {this.state.productInfo[item.itemcode][0]}</div>
                      )
                    }
                  }
                })
                :
                <div className="summary-cart-product">None</div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}