import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    validateToken: builder.query({
      query: () => `validateToken?type=customer`,
      providesTags: ["Users"],
    }),

    markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: "customer/markNotiAsRead",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    validateCode: builder.mutation({
      query: (data) => ({
        url: "validateCode",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    reSendVerificationCode: builder.mutation({
      query: (data) => ({
        url: "reSendVerificationCode",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    storeBusinessInformation: builder.mutation({
      query: (data) => ({
        url: "business/businessInfo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    resetPasswordSendLink: builder.mutation({
      query: (data) => ({
        url: "sendResetLinkEmail",
        method: "POST",
        body: data,
      }),
    }),

    verifyResetPasswordLink: builder.query({
      query: (email, token) =>
        `verifyResetPasswordLink?email=${email}&token=${token}`,
    }),

    setNewPassword: builder.mutation({
      query: (data) => ({
        url: "resetPassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useValidateTokenQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useValidateCodeMutation,
  useReSendVerificationCodeMutation,
  useStoreBusinessInformationMutation,
  useMarkNotiAsReadMutation,
  useResetPasswordSendLinkMutation,
  useSetNewPasswordMutation,
  useVerifyResetPasswordLinkQuery,
} = authApi;
