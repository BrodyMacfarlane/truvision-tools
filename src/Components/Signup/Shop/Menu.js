import React, { Component } from 'react';
import axios from 'axios';
import logo from "../../../assets/logo.svg";

const regionids = {
  "US": 1,
  "GB":	2,
  "NZ":	3,
  "MX":	4,
  "CA":	5,
  "AU":	6,
  "ZA":	7,
  "DE":	8,
  "BM":	26,
  "CR":	27,
  "IE":	28,
  "PA":	29,
  "SV":	30,
  "GT":	31,
}

export default class Autoship extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: [],
      category: 0,
      copying: false,
      productsDictionary: null
    }
  }

  componentDidMount(){
    // this.props.getProducts()
    axios.post('/api/getProducts', {region: regionids[this.props.countryCode], atype: this.props.aType})
      .then(response => {
        this.setState({products: response.data}, () => {
          let productsDictionaryPregame = {}
          for(let i = 0; i < this.state.products.length; i++){
            productsDictionaryPregame[this.state.products[i].itemid] = this.state.products[i]
          }
          this.setState({productsDictionary: productsDictionaryPregame})
        })
      })
  }

  render(){
    return (
      <div className="shop-menu-container">
        <div className="products-sidebar">
          <div className="products-sidebar-text">
          <div className="shop-step cart-prev-step" onClick={this.props.closeShop}>Back</div>
            <div className="products-sidebar-title">
              Categories
            </div>
            <div className="categories">
              Coming soon!
            </div>
          </div>
        </div>
        <div className="products-container">
          {this.state.products.map((product, i) => {
            return (
              <div key={i} className="product">
                {/* <div className="product-img">SKU#{product.sku}</div> */}
                <img src={product.image ? `https://truvision.corpadmin.directscale.com/CMS/Images/Inventory/${product.image}` : logo} alt={`SKU#${product.sku}`} className="product-img"/>
                <div className="product-info">
                  <div className="product-name">
                    {product.productname}
                  </div>
                </div>
                <div className="choose-store">
                  {product.stores.indexOf(4) > -1 ? <div className="add-product-type" onClick={() => {this.props.addToCart(product, "kit")}}>KIT</div> : null}
                  {product.stores.indexOf(5) > -1 ? <div className="add-product-type" onClick={() => {this.props.addToCart(product, "autoship")}}>AUTOSHIP</div> : null}
                </div>
              </div>
            )
          })}
        </div>
        <div className="right-shop-container">
          <div>
            <div className="shop-step cart-next-step" onClick={this.props.incrementPage}>Finalize</div>
            <div className="cart-title">
              Cart
            </div>
            <div className="cart-container">
              {
                this.state.productsDictionary
                ?
                  this.props.cart.map((cartItem, i) => {
                    return (
                      <div key={i} className="cart-item-container">
                        <div className="cart-item-remove" onClick={() => this.props.removeFromCart(i)}>
                          <svg className="remove-svg" viewBox="0 0 45 45">
                            <path fill="none" stroke="#ff4646" d={`M 5 5, L 40 40`}/>
                            <path fill="none" stroke="#ff4646" d={`M 40 5, L 5 40`}/>
                          </svg>
                        </div>
                        <img className="cart-image" src={`https://truvision.corpadmin.directscale.com/CMS/Images/Inventory/${this.state.productsDictionary[cartItem.itemcode].image}`} alt=""/>
                        <div className="cart-item">
                          <div className="cart-item-name">
                            {this.state.productsDictionary[cartItem.itemcode].productname}
                          </div>
                          <div className="cart-item-type">
                            {cartItem.type}
                          </div>
                        </div>
                      </div>
                    )
                  })
                :
                null
              }
            </div>
            {
              this.props.cart.length > 0 ?
                <div>
                  {this.state.shortenedLink ? <button onClick={this.copyToClipboard}>{this.state.shortenedLink}</button> : null}
                </div>
              : <div className="cart-text">Nothing in your cart.</div>
            }
          </div>
        </div>
        {this.state.copying ? <textarea id="copy-textarea" readonly value={this.state.shortenedLink} ref={(textarea) => this.textArea = textarea}/> : null}
      </div>
    )
  }
}