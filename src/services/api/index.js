import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createBaseQuery = (baseUrl) =>
  fetchBaseQuery({
    baseUrl: baseUrl || import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      // Common headers
      headers.set("ngrok-skip-browser-warning", "true");
      headers.set("Accept", "application/json");
      headers.set("x-app-type", "Web");

      // Set auth token if available
      const authToken = localStorage.getItem(
        import.meta.env.VITE_API_TOKEN_KEY
      );
      if (authToken) {
        headers.set("authorization", `Bearer ${authToken}`);
      }

      return headers;
    },
  });
