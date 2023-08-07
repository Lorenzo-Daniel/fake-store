import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: null,
  allCategories: null,
};

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = [...action.payload];
    },
    setAllCategories: (state, action) => {
      state.allCategories = [...action.payload];
    },
    removeAllProductsState: (state) => {
      state.allProducts = null;
      state.allCategories = null;
    },
  },
});

export const { setAllProducts, setAllCategories, removeAllProductsState } =
  allProductsSlice.actions;
export const selectAllProducts = (state) =>
  state.rootReducer.allProductsState.allProducts;
export const selectAllcategories = (state) =>
  state.rootReducer.allProductsState.allCategories;

export default allProductsSlice.reducer;
