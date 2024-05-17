import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessProfileApi = createApi({
  reducerPath: "businessProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("crmClientToken");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["BusinessProfile"],
  endpoints: (builder) => ({
    getBusinessProfile: builder.query({
      query: (id) => `customer/businessProfile/${id}`,
      providesTags: ["BusinessProfile"],
    }),

  }),
});

export const { useGetBusinessProfileQuery } =
  businessProfileApi;
