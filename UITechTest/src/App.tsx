import { useRef, useState, Children } from 'react';
import { easeIn, easeOut } from 'polished';
import { useBoolean } from 'react-use';
import { createReducer } from '@reduxjs/toolkit';
import { Button } from '@mui/material';
import MovieGrid from './MovieGrid';
import { Movie, MovieCompany } from './lib/types';
import { useGetMovieCompaniesQuery, useGetMoviesQuery } from './lib/api';

const getMovieCompanies = () => {
  const { data, isLoading, error } = useGetMovieCompaniesQuery();
  return [data, isLoading, error];
};
const getMovies = () => {
  const { data, isLoading, error } = useGetMoviesQuery();
  return [data, isLoading, error];
};

export const App = () => {
  const [selectedMovieId, setSelectedMovieId] = useState('');
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
    if (movieId === selectedMovieId) return;
    setSelectedMovieId(movieId);
  };

  if (companiesAreLoading || moviesAreLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (companiesError || !Array.isArray(companiesData)) {
    return (
      <div>
        <h2>Error fetching movie companies</h2>
      </div>
    );
  }
  if (moviesError || !Array.isArray(moviesData)) {
    return (
      <div>
        <h2>Error fetching movies</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to Movie database!</h2>
      {refreshButton('Refresh')}
      <p>Total movies displayed {moviesData?.length}</p>
      <MovieGrid movies={moviesData} companies={companiesData} handleRowClick={handleRowClick} />
      {/* <br />
      <div>
        {selectedMovie
          ? (selectedMovie.title as any)
            ? (('You have selected ' + selectedMovie.title) as any)
            : 'No Movie Title'
          : 'No Movie Seelcted'}
        {selectedMovie && <p>Please leave a review below</p>}
        {selectedMovie && (
          <form onSubmit={() => {}}>
            <label>
              Review:
              <input type="text" />
            </label>
          </form>
        )}
      </div> */}
    </div>
  );
};
