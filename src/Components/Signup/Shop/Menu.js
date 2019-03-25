import React, { Component } from 'react';
import Loading from '../../Loading/Loading';
import NoResults from '../../Loading/NoResults';
import axios from 'axios';
import logo from "../../../assets/logo.svg";
import searchimg from "../../../assets/SVG/search.svg";


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
      productsDictionary: null,
      searchValue: "",
      resultsFound: true,
      showLoading: true
    }
    this.updateSearchValue = this.updateSearchValue.bind(this)
    this.checkEnter = this.checkEnter.bind(this)
    this.searchNewProducts = this.searchNewProducts.bind(this)
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

  checkEnter(e){
    if(e.key === "Enter"){
      this.searchNewProducts()
    }
  }

  updateSearchValue(e){
    if(e.target.value === "" || /^[a-z0-9 '-()]+$/i.test(e.target.value)){
      this.setState({
        searchValue: e.target.value
      })
    }
  }

  searchNewProducts(){
    this.setState({products: [], showLoading: true, resultsFound: true})
    axios.post('/api/searchProducts', {region: regionids[this.props.countryCode], atype: this.props.aType, keyword: ["%", this.state.searchValue, "%"].join("")})
      .then(response => {
        if(response.data.length > 0){
          this.setState({products: response.data})
        }
        else {
          this.setState({resultsFound: false, showLoading: false})
        }
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
              Coming soon...
            </div>
          </div>
        </div>
        <div className="products-container">
        <div className="products-search-container">
          <div className="products-search">
            <input onChange={e => this.updateSearchValue(e)} onKeyPress={this.checkEnter} value={this.state.searchValue} type="text" placeholder="Search Products" className="products-searchbar"/>
            <img onClick={this.searchNewProducts} src={searchimg} alt="" className="search-img"/>
          </div>
        </div>
          {
            !this.state.resultsFound ? <NoResults/> : null
          }
          {
            this.state.products.length <= 0 && this.state.showLoading
            ? 
              <Loading/>
            :
            null
          }
          {this.state.products.map((product, i) => {
            return (
              <div key={i} className="product">
                <img src={product.image ? `https://truvision.corpadmin.directscale.com/CMS/Images/Inventory/${product.image}` : logo} alt={`SKU#${product.sku}`} className="product-img"/>
                <div className="product-info">
                  <div className="product-name">
                    {product.productname}
                  </div>
                  <div className="product-sku">
                    {product.sku}
                  </div>
                </div>
                <div className="choose-store">
                  {product.stores.indexOf(4) > -1 ? <div className="add-product-type" onClick={() => {this.props.addToCart(product, "kit")}}>ENROLL</div> : null}
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
                            {cartItem.type === "kit" ? "Enroll" : "Autoship"}
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