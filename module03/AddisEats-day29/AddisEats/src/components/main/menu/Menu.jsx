import React, { useState } from 'react'
import './Menu.css'
import Dish from './Dish'
import Card from './Card'
import { useCart } from '../../../cart/useCart'

const CATEGORIES = ['All', 'Main', 'Vegetarian', 'Breakfast', 'Side']

const Menu = ({ dishes = [], loading = false, error = null }) => {
  const [category, setCategory] = useState('All')
  const { cart, addToCart, removeFromCart } = useCart()

  if (loading) {
    return (
      <section className="menu">
        <p className="menu-status">Loading menu…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="menu">
        <p className="menu-status menu-error">
          Couldn&apos;t load the menu: {error.message}
        </p>
      </section>
    )
  }

  const filteredDishes =
    category === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === category)

  return (
    <section className="menu">
      <div className="categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-btn${category === cat ? ' active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="foodList">
        {filteredDishes.length === 0 ? (
          <p>No dishes found in this category.</p>
        ) : (
          filteredDishes.map((dish) => (
            <Card key={dish.id}>
              <Dish
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
                quantity={cart[dish.id] || 0}
                onAdd={() => addToCart(dish.id)}
                onRemove={() => removeFromCart(dish.id)}
              />
            </Card>
          ))
        )}
      </div>
    </section>
  )
}

export default Menu
