import { useContext } from 'react'
import CartContext from './CartContext'

/**
 * useCart — convenience hook so components read the cart from context without
 * importing the context object directly. Throws if used outside a CartProvider.
 */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}

export default useCart
