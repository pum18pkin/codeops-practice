/**
 * cartReducer — the single owner of every cart state transition.
 *
 * State shape: a plain map of dishId -> quantity, e.g. { "1": 2, "3": 1 }.
 * Keeping the cart as ids + quantities (rather than full dish objects) keeps
 * it small and lets the UI derive display data from the fetched menu.
 */

export const initialCartState = {}

export const cartActions = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SET_QTY: 'SET_QTY',
  CLEAR: 'CLEAR',
}

export function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.ADD: {
      const id = String(action.id)
      return { ...state, [id]: (state[id] || 0) + 1 }
    }

    case cartActions.REMOVE: {
      const id = String(action.id)
      if (!state[id]) return state

      const next = { ...state }
      next[id] -= 1
      if (next[id] <= 0) delete next[id]
      return next
    }

    case cartActions.SET_QTY: {
      const id = String(action.id)
      const qty = Number(action.qty)

      const next = { ...state }
      if (!qty || qty <= 0) {
        delete next[id]
      } else {
        next[id] = qty
      }
      return next
    }

    case cartActions.CLEAR:
      return initialCartState

    default:
      return state
  }
}
