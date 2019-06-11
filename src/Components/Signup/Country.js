import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import FlagIcon from 'react-flag-kit/lib/FlagIcon';
import axios from 'axios';
import '../../css/country.css';
import logo from '../../assets/logo.svg'

export default class Country extends Component {
  constructor(props){
    super(props)
      this.state = {
        countries: []
      }
  }

  componentDidMount(){
    if(!this.state.countries.length){
      axios.get('/api/getCountries')
      .then((response) => {
        this.setState({countries: response.data})
      })
    }
  }
  
  render(){
    return (
      <div className="input-component-container component-container">
        <div className="title-container content-container">
          <div className="sub-title">
            Country
          </div>
        </div>
        <div className="countries-description-container content-container">
          <div className="description">
            Please select the country your new enrollment currently resides in.
          </div>
        </div>
        <div className="countries-container content-container">
          <div>
            {
              this.state.countries.length <= 0
              ? 
                <Loading/>
              :
              null
            }
            {
              this.state.countries.map((country, i) => {
                return (
                  <div key={i} className={this.props.countryCode === country.countrycode ? "country country-selected" : "country"} onClick={(countrycode, countryname) => this.props.updateCountry(country.countrycode, country.countryname)}>
                    <FlagIcon code={country.countrycode} size={48} />
                    <div className="country-text">{country.countrycodename}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {
          this.state.countries.length > 0
          ? 
            <div className="country-selected-container content-container">
              <div className="description country-name">
                {this.props.countryName}
              </div>
            </div>
          :
          null
        }
      </div>
    )
  }
}