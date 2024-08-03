import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserProfileData: builder.query({
      query: () => `customer/profile`,
      providesTags: ["Profile"],
    }),

    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: "customer/profileImagePost",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateUserBasicInfo: builder.mutation({
      query: (data) => ({
        url: "customer/profilePost",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetUserProfileDataQuery,
  useUpdateProfileImageMutation,
  useUpdateUserBasicInfoMutation
} = profileApi;
