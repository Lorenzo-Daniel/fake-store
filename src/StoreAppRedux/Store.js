import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import cartSlice from "../Reducers/cartSlice";
import userSlice from "../Reducers/userSlice";
import savedCartSlice from "../Reducers/savedCartSlice";
import allProductsSlice from "../Reducers/productsSlice ";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartState", "userState", "savedCartState",'allProductsState'],
};

const rootReducers = combineReducers({
  cartState: cartSlice,
  userState: userSlice,
  savedCartState: savedCartSlice,
  allProductsState : allProductsSlice
});

const presistReducer = persistReducer(persistConfig, rootReducers);

export default configureStore({
  reducer: {
    rootReducer: presistReducer,
  },
  middleware: [thunk],
});
