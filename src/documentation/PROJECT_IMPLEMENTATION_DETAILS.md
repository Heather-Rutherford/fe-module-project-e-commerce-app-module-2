# Project Implementation Details: E-Commerce App

## 1. Application Bootstrapping

- The app is initialized in `main.tsx`, which sets up the React root, Redux Provider, React Query client, and React Router.
- The main entry point is wrapped with all necessary providers for state, data fetching, and routing.

## 2. Routing & Navigation

- Routing is managed in `App.tsx` using React Router DOM.
- Main routes: Home (`/`), Cart (`/cart`), Checkout (`/checkout`).
- The navigation bar provides quick access to Home and Cart pages.

## 3. State Management

- Redux Toolkit is used for global state management.
- `redux/store.ts` configures the store, combines reducers, and sets up persistence with `redux-persist` (session storage).
- Slices:
  - `cartSlice.ts`: Handles cart actions (add, remove, update quantity).
  - `productSlice.ts`: Manages product listing state.

## 4. Data Fetching

- Product and category data are fetched from the Fake Store API.
- React Query (`@tanstack/react-query`) is used for efficient data fetching and caching.
- Custom hooks (`useProducts.tsx`, `useCategories.tsx`) encapsulate API logic and caching.

## 5. UI Components

- Reusable components (ProductCard, CartButton, CartSummary, EmptyCart, OrderSummary) are used across pages.
- Bootstrap and custom CSS provide responsive design and styling.

## 6. Type Safety

- All data models (Product, CartItem) and Redux state are strongly typed using TypeScript interfaces.
- Props and state are strictly typed for reliability and maintainability.
- The files redux-persist-persistReducer.d.ts and redux-persist-session.d.ts are TypeScript declaration files and are used to tell TypeScript to accept imports from redux-persist/lib/persistReducer and redux-persist/lib/storage/session. These files prevent TypeScript errors about missing types when you use those modules in your Redux state management setup. These files are used for production purposes.

## 7. Cart Persistence

- Cart state is persisted in session storage using `redux-persist`.
- Cart contents remain available during the session, but are cleared when the browser is closed.

## 8. Error Handling & User Feedback

- API/network errors are caught and handled gracefully.
- Success messages are shown for cart actions and checkout.
- Placeholder images are used if product images fail to load.

## 9. Extensibility

- Feature-based folder structure allows easy addition of new features (e.g., authentication, reviews).
- Modular Redux slices and hooks make the codebase scalable.

---

## Summary

The implementation leverages modern React, Redux Toolkit, React Query, and TypeScript best practices. The codebase is modular, maintainable, and designed for extensibility, with clear separation of concerns and robust error handling throughout.
