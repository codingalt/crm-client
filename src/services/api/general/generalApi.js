import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const generalApi = createApi({
  reducerPath: "generalApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["General"],
  endpoints: (builder) => ({
    getCountriesData: builder.query({
      query: () => `locations`,
      providesTags: ["General"],
    }),
  }),
});

export const { useGetCountriesDataQuery } = generalApi;
