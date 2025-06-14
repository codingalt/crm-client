import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const businessProfileApi = createApi({
  reducerPath: "businessProfileApi",
  baseQuery: createBaseQuery(),
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

    validateManualAppointmentUrl: builder.query({
      query: ({ email, token }) =>
        `customer/validateURL?token=${token}&email=${email}`,
    }),

    confirmAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: `customer/confirmAppointment`,
        method: "POST",
        body: data,
      }),
    }),

    cancelAppointment: builder.mutation({
      query: (bookingId) => ({
        url: `customer/cancelTheService/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: ["BusinessProfile"],
    }),

    getPaymentMethods: builder.query({
      query: () => `paymentMethods`,
    }),

    checkBookingAvailableTime: builder.mutation({
      query: ({ id, date }) => ({
        url: `customer/checkAvailableTime/${id}`,
        method: "POST",
        body: { date: date },
      }),
      invalidatesTags: ["BusinessProfile"],
    }),

    sendRating: builder.mutation({
      query: ({ id, rating, comments }) => ({
        url: `customer/rate/${id}`,
        method: "POST",
        body: { rating: rating, comments: comments },
      }),
      invalidatesTags: ["BusinessProfile"],
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
      query: ({ serviceId, date, payment_method_id }) => ({
        url: `customer/bookAppointment/${serviceId}`,
        method: "POST",
        body: { date: date, payment_method_id: payment_method_id },
      }),
      invalidatesTags: ["BusinessProfile"],
    }),
  }),
});

export const {
  useGetBusinessProfileQuery,
  useGetPaymentIntentMutation,
  usePaymentSuccessMutation,
  useBookAppointmentMutation,
  useGetMyBookingsQuery,
  useSendRatingMutation,
  useCheckBookingAvailableTimeMutation,
  useGetPaymentMethodsQuery,
  useValidateManualAppointmentUrlQuery,
  useConfirmAppointmentMutation,
  useCancelAppointmentMutation
} = businessProfileApi;
