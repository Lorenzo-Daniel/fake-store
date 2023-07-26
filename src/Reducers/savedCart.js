import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
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
    }
  },
});

export const {
  addSavedProductToCart,
  removeProductFromSavedCart,
  removeAllProductFromSavedCart,
} = savedCartSlice.actions;
export const selectProductsSavedCartList = (state) =>
  state.rootReducer.savedCartState.productsList;
export default savedCartSlice.reducer;
