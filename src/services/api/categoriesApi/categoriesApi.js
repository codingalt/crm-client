import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getGlobalCategories: builder.query({
      query: () => `customer/categories`,
      providesTags: ["Category"],
    }),

    getBusinesses: builder.query({
      query: () => `customer/businesses`,
      providesTags: ["Category"],
    }),

    getSubCategoriesByCategoryId: builder.query({
      query: (id) => `customer/category/${id}`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetGlobalCategoriesQuery,
  useGetBusinessesQuery,
  useGetSubCategoriesByCategoryIdQuery
} = categoriesApi;
