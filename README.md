# [Fake Store][Deploy]

[deploy]: https://precious-caramel-78198c.netlify.app/

<<<<<<< HEAD

=======
>>>>>>> 2198a9c512e812a34cfec8bda46be05990339daa

## Description:

### FAKE STORE is a fictional e-commerce web app developed with React JS using create-react-app

### The app implements :

 To handle the Global Store :

  - @reduxjs/toolkit
  - react-redux
  - redux-persist
  - redux-thunk

### To create the interface:

- MUI

### For user authentication:

- firebase/auth

### For database :

- firebase/firestore

## Navigation and user interaction

### \* The interface will be different depending on whether the user is authenticated or not, offering different navigation possibilities

## Browsing without an authenticated user

### _' / '_ : When the application is mounted it offers the user a welcome interface with the option to navigate to _'/store/all-products'_

### _'/store/:params'_ :

- The component is mounted by default in _'store/all-products_ and renders 100 _ProductCard_.
- The data comes from a call to _'https://dummyjson.com/products?limit=100'_ (fake-api).
- By selecting any of the product categories offered by the list of _TemporaryDrawer_ categories in _Navbar_, we can modify the _param_ of the url and render only the products that correspond to the selected category
- Each _ProductCard_ has two buttons :
  - _add to cart/remove from cart_ : add or remove the product from the shopping cart.
  - _learn more_ : navigate to _'/product-description/:params'_.

<br>

### _'/product-description/:params'_ : Renders the details of the selected product, receives a _product_identifier_ as _params_.

- Provides the user with extended information about the product.
- Offers the possibility of removing or adding the product to the shopping cart.

<br>

### _'/cart'_ : If the user adds products to the shopping cart; renders a detail of the added products.

- Allows the user to increase or reduce the number of units of each selected product.
- Allows the user remove a product from the cart.
- Allows the user remove all products from the cart.

<br>

### _'sign-in'_ : Renders a login form with username and password _(firebase/auth)_.

- Typical form validations.
- _'error: user did not exit'_ : renders a dialog notifying the user of the error and offering the option to navigate to '/sign-up'.
- _'error: incorrect password'_ : renders a dialog notifying the user about the error and suggesting to verify the data
- _success_: Render a dialog announcing the user about successful login and navigate to '/store/all-products'.
- Provide a link to '/recover-password' if the user forgot their password.

<br>

### '/recover-password' : Renders a password change form (firebase/auth)

- Typical form validations
- _'error: user already exists'_ : renders a dialog warning the user of the error.
- _success_ : renders a dialog announcing the successful process and suggests checking your email inbox to change the password using the link that has been sent.

<br>

### '/sign-up' : renders a sign-up form, the collected data will be stored in the database (firebase/firestore)

- Typical form validations
- _'error: the user already exists'_ : if the entered user already exists, it renders a dialog warning the user of the error and suggests checking if they have not previously registered with that user.
  -success: render a dialog announcing the successful registration to the user and navigate to '/store/all-products

<br>

### 'user-messages' : renders a _hard-coded_ welcome message to FAKE STORE

## Navigation with authenticated user

### \* All possible navigations for non-authenticated user plus those listed below.

### _Navbar_ : clicking on the user icon (now colored blue) gives the user access to _'/user-account'_ . It will also allow the user to perform _logout_ and close the session.

### _'user-account'_ : renders user data and offers the possibility to modify :

- User email.
- User phone.
- Permanently delete the user account.
- If the user has previously made purchases, it renders a summary with the history of purchase orders, if the user has not made purchases this option appears in disabled

<br>

### _'/cart'_ :

- If the user abandoned a previous session with products in the shopping cart without finalizing the purchase, this data will be saved in the database and will be called in the next user login to be rendered in the _saved cart_ section. It will allow the products to be restored to the shopping cart and continue shopping or delete them.
- Checkout will be available and navigate to _'/payment-methods'_.

<br>

### _'/payment-methods'_ : will offer the user the possibility of selecting a payment method:

- Cash : navigate to _'/shipping-service'_
- Credit card : navigate to _'/credit-card-form'_

  <br>

### _'/credit-card-form'_ : renders a form and requests credit card details :

- Typical form validations.
- _success_ : navigate to _'/shipping-service'_

<br>

### _'/shipping-service'_ : renders a form and requests shipping data:

- typical form validations.
- _success_ : navigate to _'/purchase-summary'_

 <br>

### _'/purchase-summary'_ : Renders a summary of the purchase with user data, shipping data, selected products and final price.

- Handles the possibility that the user wants to log off at this point, warning that he will lose all the previous steps and the purchase will not be finalized.
- If the user completes their purchase, render a successful purchase completion dialog and provide the user with a purchase order id and shipping date and time

_'/error-404'_ : Renders a 404 error message.

- If the url does not exist.

- If the user wants to access any page that requires being logged in.

<br>

<<<<<<< HEAD
=======
![Fake Store - Google Chrome 2023-08-11 13-02-00]([https://github.com/Lorenzo-Daniel/fake-store/assets/103971385/4dda52cc-27d1-4572-bb0a-025aa0854d81](https://github.com/Lorenzo-Daniel/fake-store/assets/103971385/178e4156-353e-4f95-b6a4-7de9a414a98a))
>>>>>>> 2198a9c512e812a34cfec8bda46be05990339daa
 
[video history](https://github.com/Lorenzo-Daniel/fake-store/assets/103971385/e10eaeed-ac41-499d-9ced-410a20eff011)


## Dependencies :

- _"@emotion/react": "^11.11.1"_
- _"@emotion/styled": "^11.11.0"_
- _"@fortawesome/fontawesome-svg-core": "^6.4.0"_
- _"@fortawesome/free-regular-svg-icons": "^6.4.0"_
- _"@fortawesome/free-solid-svg-icons": "^6.4.0"_
- _"@fortawesome/react-fontawesome": "^0.2.0"_
- _"@iconify/react": "^4.1.1"_
- _"@mui/icons-material": "^5.14.0"_
- _"@mui/lab": "^5.0.0-alpha.136"_
- _"@mui/material": "^5.14.0"_
- _"@reduxjs/toolkit": "^1.9.5"_
- _"@testing-library/jest-dom": "^5.16.5"_
- _"@testing-library/react": "^13.4.0"_
- _"@testing-library/user-event": "^13.5.0"_
- _"bootstrap": "^5.3.0"_
- _"firebase": "^10.0.0"_
- _"material-ui-popup-state": "^5.0.9"_
- _"react": "^18.2.0"_
- _"react-dom": "^18.2.0"_
- _"react-redux": "^8.1.1"_
- _"react-router": "^6.14.1"_
- _"react-router-dom": "^6.14.1"_
- _"react-scripts": "5.0.1"_
- _"redux-persist": "^6.0.0"_
- _"redux-thunk": "^2.4.2"_
- _"swiper": "^10.0.4"_
- _"web-vitals": "^2.1.4"_

<br>

## _Developed by Daniel Lorenzo_
