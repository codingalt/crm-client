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

    getTargetedServices: builder.query({
      query: (city) => `customer/targetedServices?city=${city}`,
      providesTags: ["Services"],
    }),

    searchServices: builder.query({
      query: ({ query, city }) =>
        `customer/searchServices?search=${query}&city=${city}`,
    }),

    getServicesBySubCategoryId: builder.query({
      query: (id) => `customer/servicesBySubCategory/${id}`,
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

export const {
  useGetServiceDetailsByIdQuery,
  useSearchServicesQuery,
  useGetTargetedServicesQuery,
  useGetServicesBySubCategoryIdQuery
} = servicesApi;
