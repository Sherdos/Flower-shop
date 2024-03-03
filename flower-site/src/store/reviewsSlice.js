import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewsSlice = createApi({
    reducerPath:"reviews",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/"}),
    endpoints:(build)=>({
        getAllReviews:build.query({
            query:()=> 'reviews'
        }),
        setComment:build.mutation({
            query:(comment)=>({
                url:"reviews",
                method:"POST",
                body:comment
            })
        }),
    })
})

export const {useGetAllReviewsQuery , useSetCommentMutation} = reviewsSlice