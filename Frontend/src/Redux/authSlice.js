import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store to manage authentication state
const authSlice = createSlice({
  name: "auth",
    // Initial state for auth
  initialState: {
    user: null,
    loading:true
  },
    // Reducers = functions to update state
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    },
  },
});

export const {setUser, setLogout,setLoading}=authSlice.actions

export default authSlice.reducer