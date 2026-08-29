import React from 'react'

function Dish({
  name,
  price,
  spicy = false,
  currency = 'ETB',
  quantity = 0,
  onAdd,
  onRemove,
}) {
  return (
    <>
      <div className="dish-image" role="img" aria-label={name}>
        <span className="dish-image-name">{name}</span>
      </div>

      <div className="dish-body">
        <p className="namu">{name}</p>
        {spicy === true && <span className="dish-spicy">Spicy</span>}
      </div>

      <div className="dish-footer">
        <p className="dish-price">
          {currency} {price}
        </p>

        {quantity === 0 ? (
          <button className="dish-add" onClick={onAdd}>
            Add
          </button>
        ) : (
          <div className="dish-qty">
            <button onClick={onRemove} aria-label={`Remove one ${name}`}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={onAdd} aria-label={`Add one ${name}`}>
              +
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Dish
