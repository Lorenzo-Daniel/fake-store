import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  extendedUserData: null,
  historyOrders : []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userData = null;
      state.extendedUserData = null;
      state.historyOrders= null
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setUserExtendedData: (state, action) => {
      state.extendedUserData = action.payload;
    },
    setHistoryOrders :(state,action)=> {
      state.historyOrders = action.payload
    }
  },
});

export const { login, logout, setUser, setUserExtendedData,setHistoryOrders } = userSlice.actions;
export const selectUserIsLogeedIn = (state) => state.rootReducer.userState.isLoggedIn;
export const selectUserExtendedData = (state) => state.rootReducer.userState.extendedUserData;
export const selectUser = (state) => state.rootReducer.userState.userData;
export const selectHistoryOrders = (state) => state.rootReducer.userState.historyOrders;
export const selectIsLoggedin = (state) => state.rootReducer.userState.isLoggedIn;

export default userSlice.reducer;
