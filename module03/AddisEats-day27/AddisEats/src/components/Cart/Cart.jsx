import React from 'react'
import './Cart.css'

const Cart = ({
  lines = [],
  totalPrice = 0,
  currency = 'ETB',
  onAdd,
  onRemove,
  onClear,
  onClose,
}) => {
  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Your cart"
      >
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add some dishes!</p>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((line) => (
                <li key={line.id} className="cart-line">
                  <div className="cart-line-info">
                    <span className="cart-line-name">{line.name}</span>
                    <span className="cart-line-price">
                      {currency} {line.price} each
                    </span>
                  </div>

                  <div className="cart-line-qty">
                    <button onClick={() => onRemove(line.id)} aria-label={`Remove one ${line.name}`}>
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button onClick={() => onAdd(line.id)} aria-label={`Add one ${line.name}`}>
                      +
                    </button>
                  </div>

                  <span className="cart-line-total">
                    {currency} {line.lineTotal}
                  </span>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>
                  {currency} {totalPrice}
                </span>
              </div>

              <div className="cart-actions">
                <button className="cart-clear" onClick={onClear}>
                  Clear
                </button>
                <button className="cart-checkout" onClick={onClose}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default Cart
