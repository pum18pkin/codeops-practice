import React, { useState } from 'react'
import './App.css'
import Head from './components/Head/Head'
import Main from './components/main/Main'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import useFetch from './hooks/useFetch'
import { CartProvider } from './cart/CartContext'

const App = () => {
  // The menu is fetched at runtime with our own useFetch hook.
  const { data: menu, loading, error } = useFetch('/menu.json')
  const [isCartOpen, setIsCartOpen] = useState(false)

  const dishes = menu ?? []

  return (
    // CartProvider owns the cart (reducer) and shares it via context.
    // It needs the fetched menu to build detailed line items + totals.
    <CartProvider menu={dishes}>
      <div className="app">
        <Head onCartClick={() => setIsCartOpen(true)} />

        <Main dishes={dishes} loading={loading} error={error} />

        <Footer />

        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </div>
    </CartProvider>
  )
}

export default App
