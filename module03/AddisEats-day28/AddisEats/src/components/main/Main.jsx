import React from 'react'
import './Main.css'
import SideBar from './sidebar/SideBar'
import Menu from './menu/Menu'

const Main = ({ cart, addToCart, removeFromCart }) => {
  return (
    <main className="products">
      <SideBar />
      <Menu cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
    </main>
  )
}

export default Main
