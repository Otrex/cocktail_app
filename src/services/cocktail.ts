
import type { DrinksResponse, NormalizedDrink } from '@/lib/types'
import { normalizeDrink } from '@/lib/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cocktailApi = createApi({
  reducerPath: 'cocktailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/'
  }),
  endpoints: (builder) => ({
    getCocktails: builder.query<NormalizedDrink[], string>({
      keepUnusedDataFor: 30,
      query: (queryString) => `search.php${queryString ? `?${queryString}` : ''}`,
      transformResponse: (response: DrinksResponse) => {
        if (!response) return [];
        if (!response['drinks']) return [];
        if (typeof response['drinks'] == 'string') return [];
        return response.drinks.map(drink => normalizeDrink(drink))
      }
    }),
  }),
})

export const { useGetCocktailsQuery } = cocktailApi