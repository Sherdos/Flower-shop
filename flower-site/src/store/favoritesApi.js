import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }), 
  endpoints: (build) => ({
    whoami: build.query({
      query: () => "api/whoami/"
    }),
  }),
});

export const {  useWhoamiQuery } = favoritesApi;

