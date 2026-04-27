# Using the Application: E-Commerce App

## Setup & Installation

1. This project is deployed to Netlify. The URL is https://front-end-e-commerce-app.netlify.app/.

Alternatively, you can...
Download the files by cloning the Git repository: https://github.com/Heather-Rutherford/fe-module-project-e-commerce-app.git. Once the repository has been cloned, install the application via the below instructions.

After either accessing the website or installing the program, refer to the USING_THE_APPLICATION.md for more details on using this E-Commerce Application.

## Installation of the program

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

4. **Build for production:**

```bash
npm run build
```

5. **Preview production build:**

```bash
npm run preview
```

---

## Main Pages & Navigation

- **Home Page** (`/`)
  - Browse all available products.
  - Filter products by category.
  - Click on a product to view details.
  - Add products to your cart.

- **Cart Page** (`/cart`)
  - View all items added to your cart.
  - Update item quantities or remove items.
  - See the total price and item count.
  - Proceed to checkout.

- **Checkout Page** (`/checkout`)
  - Review your order summary.
  - Fill in customer information.
  - Submit your order and see a success message.

---

## Key Actions

- **Add to Cart:**
  - On the Home page, click "Add to Cart" on any product card.
  - A success message will confirm the addition.

- **View Cart:**
  - Click the "Cart" button in the navigation bar to see your cart contents.

- **Remove/Update Items:**
  - In the Cart page, use the controls to change quantities or remove products.

- **Checkout:**
  - Click "Proceed to Checkout" in the cart summary.
  - Complete the form and submit your order.

---

## Tips & Notes

- **State Persistence:**
  - Your cart is saved in session storage. Closing the browser will not clear the cart.
- **Error Handling:**
  - If product images fail to load, a placeholder image will be shown.
  - Network/API errors are handled gracefully with user feedback.
- **Responsive Design:**
  - The app is fully responsive and works on desktop and mobile devices.

---

## Troubleshooting

- If you encounter issues, ensure all dependencies are installed and your Node.js version is compatible.
- For development, check the browser console and terminal for error messages.

---

## Summary

This application provides a seamless shopping experience. Use the navigation bar to move between pages, manage your cart, and complete purchases easily.
