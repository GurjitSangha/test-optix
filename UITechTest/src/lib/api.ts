import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieCompany, SubmitReviewResponse } from './types';

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
    postReview: builder.mutation<SubmitReviewResponse, string>({
      query: (body) => ({
        url: 'submitReview',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieCompaniesQuery, usePostReviewMutation } = movieApi;

export const getData = () => {
  const {
    data: companiesData,
    isLoading: companiesAreLoading,
    isError: companiesError,
    refetch: companiesRefetch,
  } = useGetMovieCompaniesQuery();
  const {
    data: moviesData,
    isLoading: moviesAreLoading,
    isError: moviesError,
    refetch: moviesRefetch,
  } = useGetMoviesQuery();

  return {
    data: {
      movies: moviesData,
      companies: companiesData,
    },
    isLoading: moviesAreLoading || companiesAreLoading,
    isError: companiesError || moviesError,
    refetch: () => {
      if (typeof companiesRefetch === 'function' && typeof moviesRefetch === 'function') {
        companiesRefetch();
        moviesRefetch();
      }
    },
  };
};
