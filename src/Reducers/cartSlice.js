import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalCount: 0,
  productsList: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.productsList = [...state.productsList, action.payload];
      state.totalCount += 1;
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.totalCount -= 1;
      state.productsList = state.productsList.filter(product => product.id !== productId);
    }
  }
})

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export const selectTotalCount = (state)=> state.rootReducer.cartState.totalCount;
export const selectProductsCartList = (state)=>state.rootReducer.cartState.productsList;
export default cartSlice.reducer;