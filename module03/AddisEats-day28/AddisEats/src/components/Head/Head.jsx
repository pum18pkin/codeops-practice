import React from 'react'
import './Head.css'

const Head = ({ totalItems = 0, onCartClick }) => {
  return (
    <header className="head">
      <div className="head-brand">
        <span className="head-logo" aria-hidden="true"></span>
        <div className="head-titles">
          <h1>AddisEats</h1>
          <p className="head-tagline">Authentic Ethiopian food, delivered</p>
        </div>
      </div>

      <button className="head-cart" aria-label="Cart" onClick={onCartClick}>
        Cart
        {totalItems > 0 && <span className="head-cart-count">{totalItems}</span>}
      </button>
    </header>
  )
}

export default Head
