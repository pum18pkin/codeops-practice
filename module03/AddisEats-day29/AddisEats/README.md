# AddisEats — Week Capstone

An Ethiopian-food ordering UI that brings together a full week of React work
into one app. Built with React 19 + Vite.

## What this capstone pulls together

- **Fetched menu** — the dish list is loaded at runtime from `public/menu.json`
  instead of a static import.
- **Custom `useFetch` hook** — `src/hooks/useFetch.js` owns the loading / error /
  data state and cancels in-flight requests with an `AbortController`.
- **Category filter** — the menu filters by `All / Main / Vegetarian /
  Breakfast / Side` (`src/components/main/menu/Menu.jsx`).
- **Cart shared through Context** — `src/cart/CartContext.jsx` exposes the cart
  and its actions to any component (Head badge, Menu buttons, Cart panel) with
  no prop-drilling.
- **Reducer owning cart transitions** — `src/cart/cartReducer.js` is the single
  place that handles `ADD`, `REMOVE`, `SET_QTY`, and `CLEAR`.
- **Delivery form** — validated name / TeleBirr number / area before placing an
  order.

## Architecture

```
App
 └─ useFetch('/menu.json') → menu data
 └─ CartProvider (menu)            // useReducer(cartReducer) + derived totals/lines
     ├─ Head        → useCart(): totalItems badge
     ├─ Main
     │   └─ Menu    → useCart(): cart, addToCart, removeFromCart + category filter
     └─ Cart        → useCart(): lines, totalPrice, clearCart + DeliveryForm
```

The cart state is a compact map of `dishId -> quantity`. Display line items and
totals are derived by joining that map with the fetched menu inside the
provider.

## Run it

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # oxlint
```
