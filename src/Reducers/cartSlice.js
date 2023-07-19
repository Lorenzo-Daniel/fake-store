import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
  productsList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.productsList = [...state.productsList, action.payload];
      state.totalCount += 1;
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.totalCount -= 1;
      state.productsList = state.productsList.filter(
        (product) => product.id !== productId
      );
    },
    removeAllProductFromCart: (state) => {
      state.totalCount = 0;
      state.productsList = [];
    },
    updateTotalCounterCart: (state, action) => {
      state.totalCount = action.payload;
    },
    updateCartProductsList: (state, action) => {
      state.productsList = action.payload;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  removeAllProductFromCart,
  updateTotalCounterCart,
  updateCartProductsList,
} = cartSlice.actions;
export const selectTotalCount = (state) =>
  state.rootReducer.cartState.totalCount;
export const selectProductsCartList = (state) =>
  state.rootReducer.cartState.productsList;
export default cartSlice.reducer;
