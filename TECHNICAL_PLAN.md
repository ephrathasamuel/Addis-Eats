# Addis Eats — Technical Plan (Step 5)

## 1. State management approach

Three kinds of state, kept in the lowest layer that can hold them:

| State | Mechanism | Why |
|---|---|---|
| Selected category | URL search param (`/menu?category=Pizza`) | shareable, survives refresh, no extra plumbing |
| Fetched dishes | local `useState`/`useFetch` inside `Menu` | only `Menu` (and `Dish`, via its own fetch) needs it |
| Cart | Zustand store (`cart/cartStore.js`) + `persist` to `localStorage` | read/written by Menu, Dish, Cart, Checkout, CartBadge |
| Favorites | Zustand store (`favorites/favoritesStore.js`) + `persist` | read by DishCard hearts and Favorites page |
| Order history | Zustand store (`orders/orderHistoryStore.js`) + `persist`, appended on successful checkout | read by OrderHistory, Reorder |
| Sign-in session | React Context (`auth/AuthContext.jsx`), in-memory | rarely changes, only the route guard and Checkout need it |
| Theme preference | React Context (`theme/ThemeContext.jsx`) + `localStorage` | read by Layout, set from the toggle anywhere in the tree |
| Checkout form fields | local `useState` inside `Checkout` | nothing else needs them |
| Modal/dialog open state | local `useState` in the component that owns the modal | pure UI state |
| Delivery fee / ETA | derived (plain function call) in Cart/Checkout from the selected area | not stored — computed from cart + area every render |
| Cart badge count | derived selector off the cart store (`items.reduce(...)`) | no state of its own |

Zustand (not Redux/Context-for-everything) because the shared state here is simple
key-value/array data with a handful of actions — Zustand gives that without
boilerplate, and its `persist` middleware handles feature 8 (cart persistence) and
the favorites/orders/theme persistence in one line each.

## 2. Component tree

```
App
└─ AuthProvider
   └─ ThemeProvider
      └─ BrowserRouter
         └─ Layout (nav, CartBadge, ThemeToggle, <Outlet/>)
            ├─ Home                         /
            ├─ Menu                         /menu
            │   ├─ SearchBar
            │   ├─ CategoryBar
            │   └─ DishList
            │       └─ DishCard ×N
            │           └─ FavoriteButton
            ├─ Dish                         /menu/:id
            │   └─ FavoriteButton
            ├─ Cart                         /cart
            │   └─ CartLine ×N
            ├─ RequireAuth
            │   └─ Checkout                 /checkout
            │       ├─ Field ×N
            │       ├─ DeliveryEstimate
            │       └─ Confirmation (post-submit)
            ├─ Favorites                    /favorites
            │   └─ DishCard ×N
            └─ OrderHistory                 /orders
                └─ OrderHistoryItem ×N
```

Shared/generic: `ui/Button`, `ui/Spinner`, `ui/EmptyState`, `ui/ErrorMessage` are
used from inside Menu, Cart, Favorites and OrderHistory rather than duplicated.

## 3. Folder structure

```
addis-eats-react/
├─ public/
│  └─ menu-data.json
├─ src/
│  ├─ api/
│  │  └─ dishes.js
│  ├─ hooks/
│  │  ├─ useFetch.js
│  │  └─ useDebounce.js
│  ├─ ui/
│  │  ├─ Button.jsx
│  │  ├─ Spinner.jsx
│  │  ├─ EmptyState.jsx
│  │  └─ ErrorMessage.jsx
│  ├─ utils/
│  │  ├─ formatCurrency.js
│  │  └─ deliveryEstimate.js
│  ├─ menu/
│  │  ├─ Menu.jsx
│  │  ├─ CategoryBar.jsx
│  │  ├─ SearchBar.jsx
│  │  ├─ DishList.jsx
│  │  ├─ DishCard.jsx
│  │  └─ Dish.jsx
│  ├─ cart/
│  │  ├─ cartStore.js
│  │  ├─ Cart.jsx
│  │  ├─ CartLine.jsx
│  │  └─ CartBadge.jsx
│  ├─ checkout/
│  │  ├─ Checkout.jsx
│  │  ├─ validate.js
│  │  ├─ Field.jsx
│  │  ├─ DeliveryEstimate.jsx
│  │  └─ Confirmation.jsx
│  ├─ favorites/
│  │  ├─ favoritesStore.js
│  │  ├─ Favorites.jsx
│  │  └─ FavoriteButton.jsx
│  ├─ orders/
│  │  ├─ orderHistoryStore.js
│  │  ├─ OrderHistory.jsx
│  │  └─ OrderHistoryItem.jsx
│  ├─ theme/
│  │  ├─ ThemeContext.jsx
│  │  └─ ThemeToggle.jsx
│  ├─ auth/
│  │  ├─ AuthContext.jsx
│  │  ├─ RequireAuth.jsx
│  │  └─ SignIn.jsx
│  ├─ home/
│  │  └─ Home.jsx
│  ├─ App.jsx
│  ├─ Layout.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
└─ vite.config.js
```

## 4. Overall implementation approach

1. **Data layer first.** `public/menu-data.json` stands in for the API. `api/dishes.js`
   wraps `fetch('/menu-data.json')` behind `getDishes()` / `getDishById(id)`, and
   `hooks/useFetch.js` gives every screen the same `{ data, loading, error }` shape —
   this is what feature 12 (loading), 13 (empty), 14 (error) hang off of consistently.
2. **Routing skeleton.** `App.jsx` declares the five required routes plus
   `/favorites` and `/orders`, wrapped in `Layout` for shared nav/cart badge/theme
   toggle. `/checkout` is wrapped in `RequireAuth`, which reads `AuthContext` and
   redirects to a sign-in step if there's no session.
3. **Menu → Dish → Cart loop.** Build `Menu` (fetch + search + category filter,
   category synced to the URL) before `Dish`, before `Cart`, since each depends on
   the previous screen's data shape. Cart quantity math and the ETB total live in
   `cartStore.js` as derived selectors, not duplicated per-component.
4. **Checkout.** Local form state, `validate.js` as a pure function (name required,
   phone regex, area required), delivery fee/ETA derived from area, order pushed to
   `orderHistoryStore` and cart cleared only after a successful "submit."
5. **Boosters, once the 15 core features are solid.** Favorites, Order History +
   Reorder, theme toggle, special instructions, cart badge, currency formatting are
   additive — each is its own folder and doesn't touch the core loop above.
6. **Accessibility and responsiveness are cross-cutting**, not a separate task:
   every interactive element gets a visible focus state and a real `<button>`/`<label>`
   as it's built, and layout is written mobile-first (single column → grid at
   wider breakpoints) rather than retrofitted at the end.
7. **Admin extension** (optional) is a second guarded route group under `/admin`,
   built last, reusing `ui/`, `hooks/`, and `api/` rather than duplicating them.

## 5. Suggested build order (maps to Day 26–34 material)
1. Vite + React Router skeleton, empty screens, nav
2. `menu-data.json` + `api/dishes.js` + `useFetch` → Menu renders real data
3. Search + category filter (URL-synced) + DishCard + loading/empty/error states
4. Dish detail route
5. Cart store + Cart screen + CartBadge
6. Auth context + RequireAuth + Checkout form + validation + confirmation
7. Cart persistence (localStorage) — feature 8
8. Favorites, Order History/Reorder, theme toggle, currency formatting, delivery
   estimate, special instructions, keyboard pass
9. (Optional) Admin route group
