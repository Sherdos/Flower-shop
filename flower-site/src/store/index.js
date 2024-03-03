import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./cardSlice";
import authSlice from "./authSlice";
import { reviewsSlice } from "./reviewsSlice";
import card from "./card";
import favoriteSlice from "./favoriteSlice";
import { favoritesApi } from "./favoritesApi";

export const store = configureStore({
    reducer: {
        [cardSlice.reducerPath]: cardSlice.reducer,
        [reviewsSlice.reducerPath]: reviewsSlice.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
        auth:authSlice,
        category:card,
        favorites:favoriteSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardSlice.middleware , reviewsSlice.middleware, favoritesApi.middleware),
})

export default store