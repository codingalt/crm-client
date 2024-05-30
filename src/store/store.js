import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../services/slices/auth/authSlice";
import { authApi } from "../services/api/authApi/authApi";
import { categoriesApi } from "../services/api/categoriesApi/categoriesApi";
import { businessProfileApi } from "../services/api/businessProfileApi/businessProfileApi";
import { servicesApi } from "../services/api/servicesApi/servicesApi";
import { notificationsApi } from "../services/api/notificationsApi/notificationsApi";

export const store = configureStore({
  reducer: {
    // Auth Api
    [authApi.reducerPath]: authApi.reducer,

    // Category Api
    [categoriesApi.reducerPath]: categoriesApi.reducer,

    // Business Profile Api
    [businessProfileApi.reducerPath]: businessProfileApi.reducer,

    // Services Api
    [servicesApi.reducerPath]: servicesApi.reducer,

    // Notifications Api
    [notificationsApi.reducerPath]: notificationsApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      categoriesApi.middleware,
      businessProfileApi.middleware,
      servicesApi.middleware,
      notificationsApi.middleware,
    ]),
});

setupListeners(store.dispatch);
