import React from 'react'
import '../../css/subscribe.css'

export default ({ cart, toggleSubCheck, subCheck }) => {
  console.log(cart)
  return (
    <div className="subscribe-component-container component-container">
      <div className="title-container content-container">
        <div className="sub-title subscribe-title">
          Subscribe
        </div>
      </div>
      <div className="subscribe-description-container content-container">
        <div className="description">
          Want to receive a discount on items by putting them on a subscription?
        </div>
      </div>
      <div className="subscribe-summary-container summary-container">
        <div className="subscribe-wrapper">
          <div className="sub-checkbox">
            <label className="label-container">Click here to subscribe and save.
              <input type="checkbox" onChange={toggleSubCheck} checked={subCheck} />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}