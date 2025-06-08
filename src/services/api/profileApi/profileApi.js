import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: createBaseQuery(),
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
