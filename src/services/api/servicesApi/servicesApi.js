import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: createBaseQuery(),
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
      query: (queryString) => `customer/searchServices?${queryString}`,
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
  useGetServicesBySubCategoryIdQuery,
} = servicesApi;
