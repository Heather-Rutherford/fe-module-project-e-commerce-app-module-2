# Project Features: E-Commerce App

## Core Features

### 1. Product Listing

- Fetches products from the Fake Store API.
- Displays products in a responsive grid layout.
- Each product shows image, title, category, description, price, and a random rating.

### 2. Product Categories

- Fetches and displays product categories from the API.
- Allows filtering products by category.

### 3. Shopping Cart

- Add products to cart from the product listing.
- View cart items, quantities, and total price.
- Remove items or update quantities directly in the cart.
- Cart state is persisted using session storage (redux-persist).

### 4. Checkout Process

- Displays an order summary with total items and price.
- Collects customer information via a form.
- Shows a success message on order completion.

**_ Notes _**

The checkout portion of this application asks for customer information, shipping information, and provides an option to enter a credit card number, expiration data, and CVC.

This application will note that the payment has been processed but there is no functionality for actually charging a card or processing other forms of payment. Dummy data can be entered for the credit card information.

### 5. Navigation

- Navbar with Home and Cart buttons for easy navigation.
- Routing between Home, Cart, and Checkout pages using React Router.

### 6. State Management

- Uses Redux Toolkit for managing cart and product state.
- State is accessible across all pages and components.

### 7. Data Fetching & Caching

- Utilizes React Query for efficient data fetching and caching.
- Custom hooks for products and categories.

### 8. Type Safety

- All data models and props are strongly typed with TypeScript interfaces.

### 9. UI & Styling

- Uses Bootstrap for responsive design and UI components.
- Custom CSS for additional styling.

### 10. Error Handling & User Feedback

- Handles API/network errors gracefully.
- Displays success messages for cart actions and checkout.
- Shows placeholder images if product images fail to load.

---

## Extensible Features

- Modular structure allows easy addition of new features (e.g., user authentication, product reviews, order history).
- Strong typing and Redux logic make it easy to scale and refactor.

---

## Summary

This e-commerce app provides a robust shopping experience with modern UI, efficient state management, and a scalable architecture. All features are designed for usability, maintainability, and extensibility.
