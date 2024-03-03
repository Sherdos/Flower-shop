import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // Укажите свой путь к API
  endpoints: (builder) => ({
    submitFavorites: builder.mutation({
      query: ({favorites , userId}) => ({
        url: "order", // Укажите свой путь для заказов
        method: "POST",
        body: {favorites , userId}
      }),
    }),
  }),
});

export const { useSubmitFavoritesMutation } = favoritesApi;