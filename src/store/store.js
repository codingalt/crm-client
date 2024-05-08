import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../services/slices/auth/authSlice";
import { authApi } from "../services/api/authApi/authApi";
import { servicesApi } from "../services/api/servicesApi/servicesApi";

export const store = configureStore({
  reducer: {
    // Auth Api
    [authApi.reducerPath]: authApi.reducer,

    // Services Api
    [servicesApi.reducerPath]: servicesApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      servicesApi.middleware,
    ]),
});

setupListeners(store.dispatch);
