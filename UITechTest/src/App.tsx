import { Button, Container } from '@mui/material';
import { useState } from 'react';
import MovieGrid from './components/MovieGrid';
import ResponsiveReviewForm from './components/ResponsiveReviewForm';
import ReviewForm from './components/ReviewForm';
import { getData } from './lib/api';
import { Movie } from './lib/types';

export const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isLoading, isError, refetch } = getData();

  const refreshButton = () => {
    if (!data) return <p>No movie data</p>;

    return (
      <Button variant="contained" onClick={() => refetch()}>
        Refresh
      </Button>
    );
  };

  const handleRowClick = (movieId: string) => {
    // Check if we have movie data, and we're not clicking on the current movie
    if (!Array.isArray(data.movies) || movieId === selectedMovie?.id) return;
    const movie = data.movies.find((movie) => movie?.id === movieId);
    setSelectedMovie(movie || null);
  };

  // Loading State
  if (isLoading) {
    return (
      <Container maxWidth="md">
        <h2>Loading...</h2>
      </Container>
    );
  }

  // Handle fetch error, or if data is not in array format
  if (isError || !Array.isArray(data?.movies) || !Array.isArray(data?.companies)) {
    return (
      <Container maxWidth="md">
        <h2>Error fetching movie data</h2>
        {refreshButton()}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <h2>Welcome to Movie database!</h2>
      {refreshButton()}
      <p>Total movies displayed: {data.movies.length}</p>
      <MovieGrid movies={data.movies} companies={data.companies} handleRowClick={handleRowClick} />
      {selectedMovie ? (
        // Use component composition to avoid prop drilling
        <ResponsiveReviewForm>
          <ReviewForm movie={selectedMovie} />
        </ResponsiveReviewForm>
      ) : (
        <p>No Movie Selected</p>
      )}
    </Container>
  );
};
