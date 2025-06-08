import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["DashboardApi"],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => `customer/dashboard-data`,
      providesTags: ["DashboardApi"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
