import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../services/slices/auth/authSlice";
import { authApi } from "../services/api/authApi/authApi";
import { categoriesApi } from "../services/api/categoriesApi/categoriesApi";
import { businessProfileApi } from "../services/api/businessProfileApi/businessProfileApi";
import { servicesApi } from "../services/api/servicesApi/servicesApi";
import { notificationsApi } from "../services/api/notificationsApi/notificationsApi";
import { chatApi } from "../services/api/chat/chatApi";
import { profileApi } from "../services/api/profileApi/profileApi";

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

    // Chat Api
    [chatApi.reducerPath]: chatApi.reducer,

    // User Profile Api
    [profileApi.reducerPath]: profileApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      categoriesApi.middleware,
      businessProfileApi.middleware,
      servicesApi.middleware,
      notificationsApi.middleware,
      chatApi.middleware,
      profileApi.middleware,
    ]),
});

setupListeners(store.dispatch);
