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
    addQuantityProduct: (state, action) => {
      const product = state.productsList.find(
        (pdt) => pdt.id === action.payload
      );

      const productIndex = state.productsList.findIndex(
        (pdt) => pdt.id === action.payload
      );
      const updatedProduct = {
        ...product,
        quantity: product.quantity + 1,
        stock: product.stock - 1,
      };

      const updatedCart = [
        ...state.productsList.slice(0, productIndex),
        updatedProduct,
        ...state.productsList.slice(productIndex + 1),
      ];
      state.productsList = [...updatedCart];
    },
    removeQuantityProduct: (state, action) => {
      const product = state.productsList.find(
        (pdt) => pdt.id === action.payload
      );

      if (product.quantity < 2) {
        return;
      }
      const productIndex = state.productsList.findIndex(
        (pdt) => pdt.id === action.payload
      );
      const updatedProduct = {
        ...product,
        quantity: product.quantity - 1,
        stock: product.stock - 1,
      };

      const updatedCart = [
        ...state.productsList.slice(0, productIndex),
        updatedProduct,
        ...state.productsList.slice(productIndex + 1),
      ];
      state.productsList = [...updatedCart];
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
    forwardProductToCart: (state, action) => {
      const productToAdd = action.payload;
      const findProductIndex = state.productsList.findIndex(
        (product) => product.id === productToAdd.id
      );
      state.totalCount += 1
      if (findProductIndex !== -1) {
        state.productsList[findProductIndex].quantity += 1;
      } else {
        state.productsList = [
          ...state.productsList,
          { ...productToAdd, quantity: 1 },
        ];
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  removeAllProductFromCart,
  updateTotalCounterCart,
  updateCartProductsList,
  addQuantityProduct,
  removeQuantityProduct,
  forwardProductToCart
} = cartSlice.actions;
export const selectTotalCount = (state) =>
  state.rootReducer.cartState.totalCount;
export const selectProductsCartList = (state) =>
  state.rootReducer.cartState.productsList;
export default cartSlice.reducer;
