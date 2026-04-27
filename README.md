# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## E-Commerce App Overview

This project is a modular front-end e-commerce application built with React, TypeScript, and Vite. It features product listings, shopping cart functionality, checkout flow, and order summary. The codebase is organized for scalability and maintainability, with reusable components, hooks, and Redux state management.

Note: The checkout portion of this application asks for customer information, shipping information, and provides an option to enter a credit card number, expiration data, and CVC.

Note: This application will note that the payment has been processed but there is no functionality for actually charging a card or processing other forms of payment. Dummy data can be entered for the credit card information.

### Key Features

- Product catalog and details
- Shopping cart with add/remove/update
- Checkout and order completion
- Modular architecture for easy feature extension
- TypeScript for type safety
- Vite for fast development and build

## Additional Documentation

Extensive documentation outside this README is located in the documentation folder. The documentation folder contains the following files:

- `src/documentation/PROJECT_ARCHITECTURE.md`
- `src/documentation/PROJECT_FEATURES.md`
- `src/documentation/PROJECT_IMPLEMENTATION_DETAILS.md`
- `src/documentation/PROJECT_REQUIREMENTS.md`
- `src/documentation/USING_THE_APPLICATION.md`

Other features are described in the PROJECT_FEATURES.md file in the documentation folder.

## Dependencies

Main dependencies used in this project:

- React
- TypeScript
- Vite
- Redux
- redux-persist
- react-bootstrap

For a complete list, see `package.json`.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

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

## Overview of Use

The home page of the application shows the products that can be filtered by category.

Add a product by clicking 'Add to Cart'. An alert shows notifying you that the product has been added to the cart.

Click the 'Cart' button in the upper right corner of the page to view your cart. You can add and delete items from the cart using the 'Delete' or the '+' and '-' buttons.

At the bottom of the cart is a cart summary with the total number of items in the cart with the total for all the products.

The 'Proceed to Checkout' button will take you to the checkout page where you will add customer details, shipping information, and payment details.

The 'Place Order' button notifies you that your payment has been processed and your cart will be cleared. **_ Note: There is no functionality for actually charging a card or processing other forms of payment. _**

Note: The checkout portion of this application asks for customer information, shipping information, and provides an option to enter a credit card number, expiration data, and CVC.

Note: This application will note that the payment has been processed but there is no functionality for actually charging a card or processing other forms of payment. Dummy data can be entered for the credit card information.

## Notes

The checkout portion of this application asks for customer information, shipping information, and provides an option to enter a credit card number, expiration data, and CVC.

This application will note that the payment has been processed but there is no functionality for actually charging a card or processing other forms of payment. Dummy data can be entered for the credit card information.

## Contribution Guidelines

- Fork the repo and create a feature branch
- Add clear code comments for new features
- Submit a pull request with a description of your changes

## License

N/A
