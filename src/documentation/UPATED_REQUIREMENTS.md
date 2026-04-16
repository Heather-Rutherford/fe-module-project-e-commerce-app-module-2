## Objective

-- Implement Firebase into this E-Commerce App - done

## Instructions

### Part 1: Firebase Setup

--- Set Up Firebase in Your Project:
---- Create a Firebase project in the Firebase console. - done
---- Add your E-commerce app to the Firebase project. - done
---- Configure Firebase SDK in your project. - done
---- Enable Firebase Authentication and Firestore in the Firebase console. -- done

### Part 2: Firebase Authentication

--- Implement User Registration:
---- Allow new users to register with their email and password using Firebase Authentication. - done
---- Upon registration, create a corresponding user document in the users collection in Firestore. - done

--- Implement Login and Logout:
---- Authenticate users with Firebase Authentication (email/password).
---- Add a logout button that signs users out. - done

### Part 3: User Management

1. Migrate CRUD Operations to Firestore:
   --- Replace any existing CRUD operations for users with Firestore operations.
   --- Operations to implement:
   ---- Create: Add a user document when a new user registers. -- done
   ---- Read: Fetch user data to display their profile. -- done
   ---- Update: Allow users to edit their profile information (e.g., name, address). -- done
   ---- Delete: Let users delete their account and remove their data from Firestore. - done

### Part 4: Product Management

1. Replace FakeStore API:
   ---- Create a products collection in Firestore to store product data.
2. CRUD Operations for Products:
   ---- Like before, the user should be able to fetch all existing products. But now, they will be pulling from the data in Firestore
   ---- Inside the app a user should be able to Create, Update, and Delete existing products

### Part 5: Order Management

1. Create Orders:
   --- When users place their orders in their cart, store that order in Firebase. The order should include all products in the order as well as the user who placed the order

2. Order History:
   --- Allow users to access a list of their previous carts, serving as a history of their orders.
   --- Fetch the list of user orders from the backend API endpoint.
   --- Display each cart entry with details such as the cart ID, date of creation, and the total price of the order.
   --- Enable users to click on individual orders to view the full details, including the list of products and the total price of the order.
