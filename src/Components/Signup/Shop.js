import React, { Component } from 'react';
import axios from 'axios';
import Menu from './Shop/Menu';
import ShopContent from './Shop/ShopContent';
import '../../css/shop.css';

export default class Autoship extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return (
      <div>
        <div className="shop-component-container component-container">
          {!this.props.shopopen ? <ShopContent openShop={this.props.openShop}/> : null}
        </div>
        {this.props.shopopen ? <Menu incrementPage={this.props.incrementPage} username={this.props.username} autoship={this.props.autoship} countryCode={this.props.countryCode} aType={this.props.aType} closeShop={this.props.closeShop} addToCart={(cartItem, type) => {this.props.addToCart(cartItem, type)}} removeFromCart={(i) => {this.props.removeFromCart(i)}} cart={this.props.cart}/> : null}
      </div>
    )
  }
}