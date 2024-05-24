import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
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
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getServiceDetailsById: builder.query({
      query: (serviceId) => `customer/serviceById/${serviceId}`,
      providesTags: ["Services"],
    }),

    // registerUser: builder.mutation({
    //   query: (data) => ({
    //     url: "register",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Services"],
    // }),
  }),
});

export const { useGetServiceDetailsByIdQuery } = servicesApi;
