import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
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
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => `business/employees`,
      providesTags: ["Employees"], 
    }),

    addEmployee: builder.mutation({
      query: (data) => ({
        url: "business/employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation
} = employeesApi;
