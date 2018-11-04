import React, { Component } from 'react'
import bag from '../../../assets/bag.svg';

export default class ShopContent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <div className="title-container content-container">
          <div className="sub-title shop-title">
            Products
          </div>
        </div>
        <div className="shop-description-container content-container">
          <div className="description">
            Please click the button below to open the products menu.<br />From there, you can select the products your new enrollment would like to purchase.
          </div>
        </div>
        <div className="shop-container content-container">
          <div className="shop-circle" onClick={this.props.openShop}>
            <div>
              <img src={bag} alt="" className="bag-img"/>
            </div>
            <div id="shop-circle-text">
              SHOP
            </div>
          </div>
        </div>
      </div>
    )
  }
}