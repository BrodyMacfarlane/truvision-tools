import React, { Component } from 'react';
import Username from './Components/Signup/Username';
import Welcome from './Components/Signup/Welcome';
import Animation from './Components/Signup/Animation';
import Country from './Components/Signup/Country';
import Atype from './Components/Signup/Atype';
import Shop from './Components/Signup/Shop';
import Final from './Components/Signup/Final';
import axios from 'axios';
import logo from "./assets/logo.svg";
import './css/main.css';

const atypes = ["Associate", "Retail Customer", "Preferred Customer"]

class App extends Component {
  constructor(){
    super()
    this.state = {
      page: 0,
      isAnimating: false,
      isAnimating2: false,
      showContent: true,
      username: "",
      countrycode: "US",
      countryname: "United States of America",
      atype: 1,
      shopopen: false,
      cart: []
    }
    this.incrementPage = this.incrementPage.bind(this)
    this.decrementPage = this.decrementPage.bind(this)
    this.returnHome = this.returnHome.bind(this)
  }

  returnHome(){
    this.setState({page: 0, shopopen: false})
  }

  incrementPage(){
    this.setState({shopopen: false})
    if(this.state.page <= 0){
      this.startAnimation()
    }
    else if(this.state.page > 0){
      this.setState({
        page: this.state.page + 1
      })
    }
    else {
      this.setState({
        page: 0
      })
    }
  }

  decrementPage(){
    this.setState({
      page: this.state.page - 1
    })
  }

  updateUsername(username){
    this.setState({username: username})
  }

  updateCountry(countrycode, countryname){
    this.setState({countrycode: countrycode, countryname: countryname}, () => {
      console.log(this.state.countrycode)
    })
  }

  updateAType(type){
    this.setState({atype: type}, () => {
      console.log(atypes[this.state.atype - 1])
    })
  }

  updateAutoship(bool){
    this.setState({autoship: bool}, () => {
      console.log(this.state.autoship)
    })
  }

  addToCart(cartItem, type){
    let refCartItem = {
      "itemcode": cartItem.itemid,
      "qty": 1,
      "type": type
    }
    let cartPos = this.state.cart.map((x) => {
      return x.itemcode
    }).indexOf(refCartItem["itemcode"])
    if(cartPos > -1 || this.state.cart.length > 2){
      console.log('Individual item quantity limited to 1 and cart length limited to 3 items.')
    }
    else {
      let cartArr = this.state.cart.concat(refCartItem)
      this.setState({cart: cartArr})
    }
  }

  removeFromCart(i){
    let cartArr = this.state.cart
    cartArr.splice(i, 1)
    this.setState({cart: cartArr})
  }

  startAnimation(){
    this.setState({isAnimating: true, showContent: false})
    setTimeout(() => {
      this.setState({showContent: true, page: 1})
      setTimeout(() => {
        this.setState({isAnimating2: true})
        setTimeout(() => {
          this.setState({isAnimating: false})
          setTimeout(() => {
            this.setState({isAnimating2: false})
          }, 500)
        }, 500)
      }, 2000)
    }, 1000)
  }

  openShop(){
    this.setState({shopopen: true})
  }

  closeShop(){
    this.setState({shopopen: false})
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <div onClick={this.returnHome} className="nav-item nav-logo">
            <img className="logo" src={logo} />
          </div>
          <div className="nav-item nav-menu">
            <div className="menu-item">MENU</div>
            <svg className="menu-item ham-svg" viewBox="0 0 60 60">
              <path fill="none" stroke="#458CC8" strokeWidth="4" d={`M 6 57, L 12 3`}/>
              <path fill="none" stroke="#458CC8" strokeWidth="4" d={`M 12 57, L 18 3`}/>
            </svg>
          </div>
        </div>
        <div className="step-container">
          {this.state.page > 0 && !this.state.shopopen ? <div onClick={this.decrementPage} className="step"><div>PREV STEP</div></div> : null}
          <div className="signup-container">
            {this.state.page <= 0 ? <Welcome incrementPage={this.incrementPage.bind(this)}/> : null}
            {this.state.page === 1 ? <Username incrementPage={this.incrementPage.bind(this)} username={this.state.username} updateUsername={this.updateUsername.bind(this)}/> : null}
            {this.state.page === 2 ? <Country countryCode={this.state.countrycode} countryName={this.state.countryname} updateCountry={this.updateCountry.bind(this)}/> : null}
            {this.state.page === 3 ? <Atype aType={this.state.atype} updateAType={this.updateAType.bind(this)}/> : null}
            {this.state.page === 4 ? <Shop username={this.state.username} countryCode={this.state.countrycode} aType={this.state.atype} shopopen={this.state.shopopen} openShop={this.openShop.bind(this)} closeShop={this.closeShop.bind(this)} incrementPage={this.incrementPage.bind(this)} addToCart={this.addToCart.bind(this)} removeFromCart={this.removeFromCart.bind(this)} cart={this.state.cart}/> : null}
            {this.state.page === 5 ? <Final username={this.state.username} countryCode={this.state.countrycode} aType={this.state.atype} cart={this.state.cart}/> : null}
          </div>
          {this.state.page > 0 && !this.state.shopopen && this.state.page < 4 ? <div onClick={this.incrementPage} className="step"><div>NEXT STEP</div></div> : null}
          {!this.state.shopopen && this.state.page >= 4 ? <div id="no-step" className="step"><div></div></div> : null}
        </div>
        {this.state.isAnimating || this.state.isAnimating2 ? <Animation isAnimating={this.state.isAnimating} isAnimating2={this.state.isAnimating2} showContent={this.state.showContent}/> : null}
      </div>
    );
  }
}

export default App;
