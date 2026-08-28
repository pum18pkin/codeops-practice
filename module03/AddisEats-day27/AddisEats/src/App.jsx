import React, { useMemo, useState } from 'react'
import './App.css'
import Head from './components/Head/Head'
import Main from './components/main/Main'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import dishes from './components/main/menu/Dishes.json'

const App = () => {
  // cart is a map of dishId -> quantity
  const [cart, setCart] = useState({})
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (id) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))

  const removeFromCart = (id) =>
    setCart((prev) => {
      const next = { ...prev }
      if (!next[id]) return prev
      next[id] -= 1
      if (next[id] <= 0) delete next[id]
      return next
    })

  const clearCart = () => setCart({})

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  )

  // Build detailed line items from the cart map + dish data
  const cartLines = useMemo(
    () =>
      Object.entries(cart).map(([id, qty]) => {
        const dish = dishes.find((d) => String(d.id) === String(id))
        return {
          id,
          name: dish?.name ?? 'Unknown',
          price: dish?.price ?? 0,
          quantity: qty,
          lineTotal: (dish?.price ?? 0) * qty,
        }
      }),
    [cart]
  )

  const totalPrice = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.lineTotal, 0),
    [cartLines]
  )

  return (
    <div className="app">
      <Head totalItems={totalItems} onCartClick={() => setIsCartOpen(true)} />
      <Main cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      <Footer />

      {isCartOpen && (
        <Cart
          lines={cartLines}
          totalPrice={totalPrice}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  )
}

export default App
