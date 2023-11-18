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

  const refreshButton = (buttonText: any) => {
    if (data) {
      return (
        <Button variant="contained" onClick={() => refetch()}>
          {buttonText}
        </Button>
      );
    } else {
      return <p>No movies loaded yet</p>;
    }
  };

  const handleRowClick = (movieId: string) => {
    if (!Array.isArray(data.movies) || movieId === selectedMovie?.id) return;
    const movie = data.movies.find((movie) => movie?.id === movieId);
    setSelectedMovie(movie || null);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (isError || !Array.isArray(data?.movies) || !Array.isArray(data?.companies)) {
    return (
      <Container maxWidth="md">
        <h2>Error fetching movie data</h2>
        {refreshButton('Refresh')}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <h2>Welcome to Movie database!</h2>
      {refreshButton('Refresh')}
      <p>Total movies displayed {data?.movies?.length}</p>
      <MovieGrid
        movies={data?.movies}
        companies={data?.companies}
        handleRowClick={handleRowClick}
      />
      {selectedMovie ? (
        <ResponsiveReviewForm>
          <ReviewForm movie={selectedMovie} />
        </ResponsiveReviewForm>
      ) : (
        <p>No Movie Selected</p>
      )}
    </Container>
  );
};
