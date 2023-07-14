// import { configureStore } from '@reduxjs/toolkit';

// import  cartSlice from '../Reducers/cartSlice';

// export default configureStore({
//   reducer: {
//     cart: cartSlice 
//   }
// })

import { configureStore } from '@reduxjs/toolkit';
import storage  from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import  cartSlice from '../Reducers/cartSlice';


const persistConfig = {
  key:'productsInCart',
  storage,
  whitelist: ['cartState']
}


const productInCartreducer = combineReducers({
  cartState : cartSlice
})

const presistReducer = persistReducer(persistConfig,productInCartreducer)


export default configureStore({
  reducer: {
    cart: presistReducer 
  },
  middleware : [thunk]
})