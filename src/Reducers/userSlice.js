import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    }, 
  },
});

export const { login, logout, setUser } = userSlice.actions;
export const selectUserIsLogeedIn = (state)=> state.rootReducer.userState.isLoggedIn
export const selectUser= (state)=> state.rootReducer.userState.userData

export default userSlice.reducer
