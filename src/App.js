import React, { Component } from 'react';
import Username from './Components/Signup/Username';
import Welcome from './Components/Signup/Welcome';
import Animation from './Components/Signup/Animation';
import Country from './Components/Signup/Country';
import Shop from './Components/Signup/Shop';
import Summary from './Components/Signup/Summary';
import Final from './Components/Signup/Final';
import Import from './Components/Menu/Import';
import logo from "./assets/logo.svg";
import './css/main.css';

const atypes = ["Associate", "Retail Customer", "Preferred Customer"]

function countTypes(typearr){
  let kitcount = 0
  let autoshipcount = 0
  for(let i = 0; i < typearr.length; i++){
    if(typearr[i] === "autoship") {
      autoshipcount++
    }
    else {
      kitcount++
    }
  }
  return [kitcount, autoshipcount]
}

function numberOfEach(ic, itemcodes){
  let count = 0
  for(let i = 0; i < itemcodes.length; i++){
    if(itemcodes[i] === ic) {
      count++
    }
  }
  return count
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      page: 0,
      animationHasRun: false,
      isAnimating: false,
      isAnimating2: false,
      showContent: true,
      username: "",
      countrycode: "US",
      countryname: "United States of America",
      atype: 2,
      shopopen: false,
      cart: [],
      isImporting: false,
      returnPage: 0
    }
    this.incrementPage = this.incrementPage.bind(this)
    this.decrementPage = this.decrementPage.bind(this)
    this.returnHome = this.returnHome.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.setPage = this.setPage.bind(this)
    this.showImport = this.showImport.bind(this)
    this.hideImport = this.hideImport.bind(this)
    this.importLink = this.importLink.bind(this)
  }

  returnHome(){
    this.setState({page: 0, shopopen: false, isImporting: false, cart: [], returnPage: 0})
  }

  setPage(page, shopopen){
    this.setState({page: page, shopopen: shopopen, isImporting: false})
  }

  incrementPage(){
    this.setState({shopopen: false})
    if(this.state.page <= 0 && this.state.animationHasRun === false){
      this.startAnimation()
    }
    else if(this.state.page >= 0){
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

  toggleMenu(){
    this.setState({menuOpen: !this.state.menuOpen})
  }

  decrementPage(){
    this.setState({
      page: this.state.page - 1,
      menuOpen: false
    })
  }

  updateUsername(username){
    this.setState({username: username})
  }

  updateCountry(countrycode, countryname){
    this.setState({countrycode: countrycode, countryname: countryname, menuOpen: false, cart: []}, () => {
      this.incrementPage()
    })
  }

  updateAType(type){
    this.setState({atype: type, menuOpen: false, cart: []}, () => {
      this.incrementPage()
    })
  }

  addToCart(cartItem, type){

    let typeDic = {"kit": "orderqty", "autoship": "autoshipqty"}

    console.log(cartItem, type)

    let refCartItem = {
        itemcode: cartItem.itemid,
        orderqty: type === "kit" || type === "both" ? 1 : 0,
        autoshipqty: type === "autoship" || type === "both" ? 1 : 0
    }

    let cartIndex = this.state.cart.map(item => item.itemcode).indexOf(cartItem.itemid)

    if (cartIndex === -1) {
      let cartArr = this.state.cart.concat(refCartItem)
      this.setState({cart: cartArr})
    }

    else if (type === "both") {
      let newCart = this.state.cart
      newCart[cartIndex]["orderqty"] = 1
      newCart[cartIndex]["autoshipqty"] = 1
      this.setState({cart: newCart})
    }
    
    else if (this.state.cart[cartIndex][typeDic[type]] === 0) {
      let newCart = this.state.cart
      newCart[cartIndex][typeDic[type]] = 1
      this.setState({cart: newCart})
    }

    else {
      console.log("already have item/type")
    }
  }

  removeFromCart(i) {
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
            this.setState({isAnimating2: false, animationHasRun: true})
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

  showImport(){
    this.closeShop()
    if(!this.state.isImporting){
      this.setState({returnPage: this.state.page},
        () => {
          this.setState({isImporting: true, page: "importing"})
        }
      )
    }
  }

  hideImport(){
    this.setState({isImporting: false, page: this.state.returnPage})
  }

  importLink(username, associatetype, countrycode, cart){
    this.setState({
      username: username,
      atype: associatetype,
      countrycode: countrycode,
      cart: cart
    }, () => {
      this.setPage(4, false)
    })
    console.log(`username: ${username}`)
    console.log(`associate type: ${associatetype}`)
    console.log(`country code: ${countrycode}`)
    console.log(cart)
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <div onClick={this.returnHome} className="nav-item nav-logo">
            <img className="logo" src={logo} />
          </div>
          <div onClick={this.toggleMenu} className="nav-item nav-menu">
          <div onClick={this.showImport} className="menu-item">Test TruVis.io Link</div>
          </div>
        </div>
        <div className="step-container">
          {this.state.page > 0 && !this.state.shopopen ? <div id="prev-step" onClick={this.decrementPage} className="step"><div>PREV STEP</div></div> : null}
          <div className="signup-container">
            {this.state.page <= 0 ? <Welcome incrementPage={this.incrementPage.bind(this)}/> : null}
            {this.state.page === 1 ? <Username incrementPage={this.incrementPage.bind(this)} username={this.state.username} updateUsername={this.updateUsername.bind(this)}/> : null}
            {this.state.page === 2 ? <Country countryCode={this.state.countrycode} countryName={this.state.countryname} updateCountry={this.updateCountry.bind(this)}/> : null}
            {this.state.page === 3 ? <Shop username={this.state.username} countryCode={this.state.countrycode} aType={this.state.atype} shopopen={this.state.shopopen} openShop={this.openShop.bind(this)} closeShop={this.closeShop.bind(this)} incrementPage={this.incrementPage.bind(this)} addToCart={this.addToCart.bind(this)} removeFromCart={this.removeFromCart.bind(this)} cart={this.state.cart}/> : null}
            {this.state.page === 4 ? <Summary username={this.state.username} countryCode={this.state.countrycode} aType={this.state.atype} cart={this.state.cart} updateUsername={this.updateUsername.bind(this)} setPage={(page, shopopen) => this.setPage(page, shopopen)}/> : null}
            {this.state.page === 5 ? <Final username={this.state.username} countryCode={this.state.countrycode} aType={this.state.atype} cart={this.state.cart}/> : null}
          </div>
          {this.state.page > 0 && !this.state.shopopen && (this.state.page !== 3 && this.state.page < 5) ? <div id="next-step" onClick={this.incrementPage} className="step"><div>{this.state.page === 4 ? "FINALIZE" : "NEXT STEP"}</div></div> : null}
        </div>
        {this.state.isAnimating || this.state.isAnimating2 ? <Animation isAnimating={this.state.isAnimating} isAnimating2={this.state.isAnimating2} showContent={this.state.showContent}/> : null}
        {this.state.isImporting ? <Import importLink={(username, associatetype, countrycode, cart) => {this.importLink(username, associatetype, countrycode, cart)}} showImport={this.showImport} hideImport={this.hideImport}/> : null}
      </div>
    );
  }
}

export default App;
