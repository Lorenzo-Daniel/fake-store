
import { configureStore } from '@reduxjs/toolkit';
import storage  from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import  cartSlice from '../Reducers/cartSlice';
import userSlice from '../Reducers/userSlice';


const persistConfig = {
  key:'root',
  storage,
  whitelist: ['cartState','userState']
}


const rootReducers = combineReducers({
  cartState : cartSlice,
  userState : userSlice
})

const presistReducer = persistReducer(persistConfig,rootReducers)


export default configureStore({
  reducer: {
    rootReducer:presistReducer ,
  } ,
  middleware : [thunk],
})