import React, {
  createContext,
  useReducer,
  useMemo,
  useCallback,
} from 'react'
import { cartReducer, initialCartState, cartActions } from './cartReducer'

const CartContext = createContext(null)

/**
 * CartProvider owns the cart via a reducer and shares it through context so
 * any component in the tree can read the cart and dispatch transitions
 * without prop-drilling.
 *
 * @param {object[]} menu - the fetched list of dishes, used to build the
 *   detailed line items and totals shown in the cart.
 */
export function CartProvider({ menu = [], children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  const addToCart = useCallback(
    (id) => dispatch({ type: cartActions.ADD, id }),
    []
  )
  const removeFromCart = useCallback(
    (id) => dispatch({ type: cartActions.REMOVE, id }),
    []
  )
  const setQuantity = useCallback(
    (id, qty) => dispatch({ type: cartActions.SET_QTY, id, qty }),
    []
  )
  const clearCart = useCallback(() => dispatch({ type: cartActions.CLEAR }), [])

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  )

  // Join the cart map with menu data to build display line items.
  const lines = useMemo(
    () =>
      Object.entries(cart).map(([id, qty]) => {
        const dish = menu.find((d) => String(d.id) === String(id))
        return {
          id,
          name: dish?.name ?? 'Unknown',
          price: dish?.price ?? 0,
          quantity: qty,
          lineTotal: (dish?.price ?? 0) * qty,
        }
      }),
    [cart, menu]
  )

  const totalPrice = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines]
  )

  const value = useMemo(
    () => ({
      cart,
      lines,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
    }),
    [
      cart,
      lines,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
