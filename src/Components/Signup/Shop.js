import React, { Component } from 'react';
import axios from 'axios';
import Menu from './Shop/Menu';
import ShopContent from './Shop/ShopContent';
import '../../css/shop.css';

// function incrdecr()

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
        {this.props.shopopen ? <Menu username={this.props.username} autoship={this.props.autoship} countryCode={this.props.countryCode} aType={this.props.aType} closeShop={this.props.closeShop} addToCart={(cartItem) => {this.props.addToCart(cartItem)}} cart={this.props.cart}/> : null}
      </div>
    )
  }
}