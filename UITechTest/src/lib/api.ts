import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieCompany } from './types';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => 'movies',
    }),
    getMovieCompanies: builder.query<MovieCompany[], void>({
      query: () => 'movieCompanies',
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieCompaniesQuery } = movieApi;
