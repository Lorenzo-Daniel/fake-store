import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
  isCharged: false,
};

export const savedCartSlice = createSlice({
  name: "savedCart",
  initialState: initialState,
  reducers: {
    addSavedProductToCart: (state, action) => {
      state.productsList = [...action.payload];
    },

    removeProductFromSavedCart: (state, action) => {
      const productId = action.payload;
      state.productsList = state.productsList.filter(
        (product) => product.id !== productId
      );
    },
    removeAllProductFromSavedCart: (state) => {
      state.productsList = [];
    },
    documentIsCharged: (state, action) => {
      state.isCharged = action.payload;
    },
  },
});

export const {
  addSavedProductToCart,
  removeProductFromSavedCart,
  removeAllProductFromSavedCart,
  documentIsCharged,
} = savedCartSlice.actions;
export const selectProductsSavedCartList = (state) =>
  state.rootReducer.savedCartState.productsList;
export const selectIsCharged = (state) =>
  state.rootReducer.savedCartState.isCharged;

export default savedCartSlice.reducer;
