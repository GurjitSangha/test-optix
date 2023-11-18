import { useRef, useState, Children } from 'react';
import { easeIn, easeOut } from 'polished';
import { useBoolean } from 'react-use';
import { createReducer } from '@reduxjs/toolkit';
import { Button, Container } from '@mui/material';
import MovieGrid from './components/MovieGrid';
import { Movie, MovieCompany } from './lib/types';
import { useGetMovieCompaniesQuery, useGetMoviesQuery } from './lib/api';
import ReviewForm from './components/ReviewForm';

const getMovieCompanies = () => {
  const { data, isLoading, error } = useGetMovieCompaniesQuery();
  return [data, isLoading, error];
};
const getMovies = () => {
  const { data, isLoading, error } = useGetMoviesQuery();
  return [data, isLoading, error];
};

export const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [companiesData, companiesAreLoading, companiesError] = getMovieCompanies();
  const [moviesData, moviesAreLoading, moviesError] = getMovies();

  const refreshButton = (buttonText: any) => {
    if (companiesData) {
      return <Button variant="contained">{buttonText}</Button>;
    } else {
      return <p>No movies loaded yet</p>;
    }
  };

  const handleRowClick = (movieId: string) => {
    if (!Array.isArray(moviesData) || movieId === selectedMovie?.id) return;
    const movie = moviesData.find((movie) => movie?.id === movieId);
    setSelectedMovie(movie || null);
  };

  if (companiesAreLoading || moviesAreLoading) {
    return (
      <Container maxWidth="md">
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (companiesError || !Array.isArray(companiesData)) {
    return (
      <Container maxWidth="md">
        <h2>Error fetching movie companies</h2>
      </Container>
    );
  }
  if (moviesError || !Array.isArray(moviesData)) {
    return (
      <Container maxWidth="md">
        <h2>Error fetching movies</h2>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <h2>Welcome to Movie database!</h2>
      {refreshButton('Refresh')}
      <p>Total movies displayed {moviesData?.length}</p>
      <MovieGrid movies={moviesData} companies={companiesData} handleRowClick={handleRowClick} />
      {selectedMovie ? <ReviewForm movie={selectedMovie} /> : <p>No Movie Selected</p>}
    </Container>
  );
};
