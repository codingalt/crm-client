import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("crmBusinessToken");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getServiceCategories: builder.query({
      query: () => `customer/categories`,
      // providesTags: ["Services"],
    }),

    getServiceSubCategories: builder.query({
      query: (id) => `customer/category/${id}`,
      // providesTags: ["Services"],
    }),

    getServiceTags: builder.query({
      query: () => `customer/tags`,
      // providesTags: ["Services"],
    }),

    getEmployees: builder.query({
      query: () => `business/employees`,
      // providesTags: ["Services"],
    }),

    getServices: builder.query({
      query: () => `business/services`,
      providesTags: ["Services"],
    }),

    addService: builder.mutation({
      query: (data) => ({
        url: "business/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServiceCategoriesQuery,
  useGetServiceTagsQuery,
  useGetEmployeesQuery,
  useGetServiceSubCategoriesQuery,
  useAddServiceMutation,
  useGetServicesQuery
} = servicesApi;
