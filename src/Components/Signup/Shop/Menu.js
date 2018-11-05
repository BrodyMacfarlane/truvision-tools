import React, { Component } from 'react';
import axios from 'axios';
import exit from '../../../assets/SVG/exit.svg'

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
      shortenedLink: "",
      copying: false,
      productsDictionary: null
    }
    this.shortenLink = this.shortenLink.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  componentDidMount(){
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

  shortenLink(){
    axios.post('/api/getShortLink', {username: this.props.username, aType: this.props.aType, countryCode: this.props.countryCode, cart: this.props.cart})
      .then(response => {
        let resp = response.data.data
        this.setState({shortenedLink: resp.url})
      })
  }

  copyToClipboard = (e) => {
    this.setState({copying: true}, () => {
      this.textArea.select();
      document.execCommand('copy');
      this.setState({copying: false})
    })
  }

  render(){
    return (
      <div className="shop-menu-container">
        <div className="products-sidebar">
          <div className="products-sidebar-text">
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
                <img src={`https://truvision.corpadmin.directscale.com/CMS/Images/Inventory/${product.image}`} alt={`SKU#${product.sku}`} className="product-img"/>
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
            <div className="exit-shop-container">
              <div className="exit-shop" onClick={this.props.closeShop}>
                <svg className="exit-svg" viewBox="0 0 45 45">
                  <path fill="none" stroke="#FF0000" d={`M 5 5, L 40 40`}/>
                  <path fill="none" stroke="#FF0000" d={`M 40 5, L 5 40`}/>
                </svg>
                {/* <img src={exit} alt="" className="exit-svg" onClick={this.props.closeShop}/> */}
                {/* <div className="exit-text">Exit Shop</div> */}
              </div>
            </div>
            <div className="cart-container">
              {
                this.state.productsDictionary
                ?
                  this.props.cart.map((cartItem, i) => {
                    return (
                      <div key={i} className="cart-item-container">
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
                  <button className="generate-link" onClick={this.shortenLink}>
                    Generate URL
                  </button>
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