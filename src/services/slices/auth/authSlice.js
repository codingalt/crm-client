import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoaded: null,
  location: JSON.parse(localStorage.getItem("userLocation")) ?? null,
  isLocationChanged: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
    },

    setUserLocation: (state, action) => {
      state.location = {
        ...state.location,
        ...action.payload,
      };
    },

    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },

    setLocationChanged: (state, action) => {
      state.isLocationChanged = true;
    },
  },
});

export const { setAuth, logout, setIsLoaded, setUserLocation, setLocationChanged } =
  authSlice.actions;
export default authSlice.reducer;
