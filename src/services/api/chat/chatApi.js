import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "..";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["chatApi"],
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: ({ user_type }) => `fetchCommunications?user_type=${user_type}`,
    }),

    oneOoneCommunication: builder.query({
      query: ({ user_type, receiver_id }) =>
        `oneOoneCommunication?user_type=${user_type}&receiver_id=${receiver_id}`,
    }),

    readMessages: builder.mutation({
      query: ({ communication_id, user_type }) => ({
        url: `readMessages/${communication_id}`,
        method: "POST",
        body: { user_type: user_type },
      }),
    }),

    sendMessage: builder.mutation({
      query: ({ chatId, data }) => ({
        url: `sendMessage/${chatId}`,
        method: "POST",
        body: data,
      }),
    }),

    assignChatToEmployee: builder.mutation({
      query: ({ communicationId, employeeId }) => ({
        url: `business/assignCommunicationToEmployee/${communicationId}/${employeeId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useOneOoneCommunicationQuery,
  useSendMessageMutation,
  useAssignChatToEmployeeMutation,
  useReadMessagesMutation
} = chatApi;
