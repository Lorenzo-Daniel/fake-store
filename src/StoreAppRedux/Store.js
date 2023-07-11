import { configureStore } from '@reduxjs/toolkit';

import  cartSlice from '../Reducers/cartSlice';

export default configureStore({
  reducer: {
    cart: cartSlice
  }
})