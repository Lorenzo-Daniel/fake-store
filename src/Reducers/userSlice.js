import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  extendedUserData: null,
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
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setUserExtendedData: (state, action) => {
      state.extendedUserData = action.payload;
    },
  },
});

export const { login, logout, setUser, setUserExtendedData } = userSlice.actions;
export const selectUserIsLogeedIn = (state) => state.rootReducer.userState.isLoggedIn;
export const selectUserExtendedData = (state) => state.rootReducer.userState.extendedUserData;
export const selectUser = (state) => state.rootReducer.userState.userData;

export default userSlice.reducer;
