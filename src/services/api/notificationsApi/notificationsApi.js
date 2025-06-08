import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `customer/notifications`,
      providesTags: ["Notifications"],
    }),
    
  }),
});

export const { useGetNotificationsQuery } =
  notificationsApi;
