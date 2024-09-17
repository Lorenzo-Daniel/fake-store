# FAKE STORE

**FAKE STORE** is a fictional e-commerce web app developed with **React JS** using `create-react-app`. This project was built to deepen the understanding of **Redux**, **Firebase**, and **MUI** technologies.

[video history](https://github.com/Lorenzo-Daniel/fake-store/assets/103971385/10ff6c8c-2a1d-4352-ba59-53a8da334ad9)

## Key Features

### Global State Management:
- **@reduxjs/toolkit**: A powerful tool for managing global state in Redux.
- **react-redux**: Official React bindings for Redux to connect components to the store.
- **redux-persist**: Enables persistent state storage across sessions.
- **redux-thunk**: Middleware that allows you to write asynchronous logic in Redux actions.

### User Interface:
- **MUI (Material UI)**: A popular UI component library for React, providing pre-built, responsive, and customizable UI elements.

### User Authentication:
- **firebase/auth**: Provides authentication methods including email/password, OAuth, and more.

### Database:
- **firebase/firestore**: A NoSQL cloud database for storing app data in real-time.

---

## Application Functionalities

### Navigation without Authenticated User

- **`'/'`**:  
  When the application mounts, it offers a welcome interface with the option to navigate to `/store/all-products`.

- **`'/store/:params'`**:  
  - Mounted by default at `/store/all-products` and renders 100 `ProductCard`.
  - The data is fetched from the [Dummy API](https://dummyjson.com/products?limit=100).
  - By selecting any product category from the `TemporaryDrawer` in the `Navbar`, the URL param is updated to render products matching the selected category.
  - Each `ProductCard` offers two buttons:
    - **Add to cart/Remove from cart**: Adds or removes the product from the shopping cart.
    - **Learn more**: Navigates to `/product-description/:params`.

- **`'/product-description/:params'`**:  
  Renders details of the selected product, allowing the user to add or remove the product from the cart.

- **`'/cart'`**:  
  Displays a detailed view of the products added to the shopping cart, allowing users to:
  - Increase or decrease the quantity of each product.
  - Remove a product from the cart.
  - Remove all products from the cart.

- **`'/sign-in'`**:  
  Renders a login form with email and password authentication (via **firebase/auth**).  
  Possible responses:
  - **Error: User does not exist**: Displays an error dialog and offers the option to navigate to `/sign-up`.
  - **Error: Incorrect password**: Displays an error dialog, suggesting data verification.
  - **Success**: Displays a successful login dialog and redirects to `/store/all-products`.
  - Includes a link to `/recover-password` for users who forget their password.

- **`'/recover-password'`**:  
  A password recovery form (via **firebase/auth**).  
  Possible responses:
  - **Error: User already exists**: Displays an error dialog.
  - **Success**: Displays a success dialog, prompting the user to check their inbox for the password reset link.

- **`'/sign-up'`**:  
  A sign-up form to register a new user (data is stored in **firebase/firestore**).  
  Possible responses:
  - **Error: User already exists**: Displays an error dialog and suggests checking if the user has already registered.
  - **Success**: Displays a successful registration dialog and redirects to `/store/all-products`.

- **`'/user-messages'`**:  
  Renders a hard-coded welcome message to FAKE STORE.

### Navigation with Authenticated User

- **Navbar**:  
  Clicking the user icon (now colored blue) gives access to `/user-account`, allowing logout and session closure.

- **`'/user-account'`**:  
  Displays user data and offers the possibility to modify:
  - User email.
  - User phone.
  - Permanently delete the user account.
  - If the user has made previous purchases, it shows a summary of purchase orders. If not, this option is disabled.

- **`'/cart'` (for authenticated users)**:  
  If the user left products in the cart during a previous session, this data is saved in the database and reloaded upon login.  
  The user can:
  - Restore products to the cart and continue shopping.
  - Proceed to checkout, which redirects to `/payment-methods`.

- **`'/payment-methods'`**:  
  Offers the following payment options:
  - **Cash**: Navigates to `/shipping-service`.
  - **Credit card**: Navigates to `/credit-card-form`.

- **`'/credit-card-form'`**:  
  Renders a form requesting credit card details.  
  Possible response:
  - **Success**: Navigates to `/shipping-service`.

- **`'/shipping-service'`**:  
  Renders a form requesting shipping data.  
  Possible response:
  - **Success**: Navigates to `/purchase-summary`.

- **`'/purchase-summary'`**:  
  Displays a summary of the purchase, including user data, shipping details, selected products, and the final price.  
  Allows the user to log off and warns that logging off will cancel the purchase.  
  If the purchase is completed, a success dialog is shown, providing the purchase order ID and estimated shipping time.

- **`'/error-404'`**:  
  Renders a 404 error message if:
  - The URL does not exist.
  - The user tries to access a page requiring authentication.

---

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For global state management.
- **Firebase**: For authentication (`firebase/auth`) and database (`firebase/firestore`).
- **MUI (Material UI)**: For building the UI components.
- **react-router-dom**: For routing and navigation.
- **redux-persist**: For persisting the state between sessions.
- **redux-thunk**: Middleware for handling asynchronous actions in Redux.
- **Swiper**: For adding sliders and carousels.
- **Bootstrap**: For additional UI styling.
- **Font Awesome**: For icons and UI elements.
- **@iconify/react**: For scalable vector icons.

---

## Deployment

The application is live and can be accessed at the following link:

[Visit the NASA Web App](https://precious-caramel-78198c.netlify.app/)

This web app is deployed using **Netlify** for easy continuous deployment and integration with GitHub.





## _Developed by Daniel Lorenzo_
