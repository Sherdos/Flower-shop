import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const cardSlice = createApi({
  reducerPath: "card",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (build) => ({
    getAllCards: build.query({
      query: () =>`card?${filter.category !== "All" ? `category=${filter.category}` : ""
        }`,
      providesTags: ["card"],
    }),
    getProduct: build.query({
      query: (id) => `card/${id}`,
    }),
    addProduct: build.mutation({
      query: (cards) => ({
        url: "card/",
        method: "POST",
        body: cards,
      }),
      invalidatesTags: ["card"],
    }),
    registerUser: build.mutation({
      query: (user) => ({
        url: "api/register/",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "same-origin",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: build.mutation({
      query: (user) => ({
        url: "api/login/",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "same-origin",
        method: "POST",
        body: user,
      }),
    }),
    checkSession: build.query({
      query: () => `api/session/`,
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useGetProductQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckSessionQuery,
} = cardSlice;
