import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initialize user as null
  token: null, // Initialize token as null
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
        isLoading: false,
        isError: false,
      };
    },
    logout: (state) => {
      return {
        ...state,
        user: null,
        token: null,
      };
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
