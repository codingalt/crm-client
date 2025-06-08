import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: createBaseQuery(),
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
