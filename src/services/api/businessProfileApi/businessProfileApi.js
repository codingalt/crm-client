import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessProfileApi = createApi({
  reducerPath: "businessProfileApi",
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
  tagTypes: ["BusinessProfile"],
  endpoints: (builder) => ({
    getBusinessProfile: builder.query({
      query: (id) => `customer/businessProfile/${id}`,
      providesTags: ["BusinessProfile"],
    }),

    getMyBookings: builder.query({
      query: () => `customer/bookings`,
      providesTags: ["BusinessProfile"],
    }),

    getPaymentIntent: builder.mutation({
      query: ({ amount }) => ({
        url: `customer/balanceTopUpPaymentIntent`,
        method: "POST",
        body: { amount: amount },
      }),
      invalidatesTags: ["BusinessProfile"],
    }),

    paymentSuccess: builder.mutation({
      query: ({ payment_intent }) => ({
        url: `customer/balanceTopUpConfirmPayment`,
        method: "POST",
        body: { payment_intent_id: payment_intent },
      }),
      invalidatesTags: ["BusinessProfile"],
    }),

    bookAppointment: builder.mutation({
      query: ({ serviceId, date }) => ({
        url: `customer/bookAppointment/${serviceId}`,
        method: "POST",
        body: { date: date },
      }),
      invalidatesTags: ["BusinessProfile"],
    }),
  }),
});

export const { useGetBusinessProfileQuery, useGetPaymentIntentMutation, usePaymentSuccessMutation, useBookAppointmentMutation, useGetMyBookingsQuery } =
  businessProfileApi;
