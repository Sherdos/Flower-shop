import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const cardSlice = createApi({
  reducerPath: "card",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (build) => ({
    getAllCards: build.query({
      query: () => `card/`,
      providesTags: ["card"],
    }),
    getProduct: build.query({
      query: (id) => `card/${id}/`,
    }),
    addProduct: build.mutation({
      query: (cards) => ({
        url: "order/",
        method: "POST",
        body: cards,
      }),
      invalidatesTags: ["card"],
    })
  }),
});

export const {
  useGetAllCardsQuery,
  useGetProductQuery
} = cardSlice;
