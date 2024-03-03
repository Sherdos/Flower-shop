import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cardSlice = createApi({
    reducerPath:"card",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/"}),
    endpoints:(build)=>({
        getAllCards:build.query({
            query:(filter)=>`cards?${filter.category !== 'All'? `category=${filter.category}`:''}`,
            providesTags:['cards']
        }),
        getProduct: build.query({
            query:(id)=> `cards/${id}`
        }),
        addProduct:build.mutation({
            query:(cards)=>({
                url:"cards",
                method:"POST",
                body:cards
            }),
            invalidatesTags:['cards']
        }),
        registerUser:build.mutation({
            query:(user)=>({
                url:"api-auth/register/",
                method:"POST",
                body:user
            })
        }),
        loginUser:build.mutation({
            query:(user)=>({
                url:"api-auth/login/",
                method:"POST",
                body:user
            })
        })
    })
})

export const {useGetAllCardsQuery, useGetProductQuery, useRegisterUserMutation, useLoginUserMutation} = cardSlice