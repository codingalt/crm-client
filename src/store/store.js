import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../services/slices/auth/authSlice";
import { authApi } from "../services/api/authApi/authApi";
import { servicesApi } from "../services/api/servicesApi/servicesApi";
import { employeesApi } from "../services/api/employeesApi/employeesApi";

export const store = configureStore({
  reducer: {
    // Auth Api
    [authApi.reducerPath]: authApi.reducer,

    // Services Api
    [servicesApi.reducerPath]: servicesApi.reducer,

    // Employees Api
    [employeesApi.reducerPath]: employeesApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      servicesApi.middleware,
      employeesApi.middleware,
    ]),
});

setupListeners(store.dispatch);
