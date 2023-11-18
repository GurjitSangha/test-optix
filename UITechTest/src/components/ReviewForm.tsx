import { Box, Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Movie } from '../lib/types';
import { usePostReviewMutation } from '../lib/api';
import { useState } from 'react';
import { useMedia } from 'react-use';

interface IFormInput {
  review: string;
}
type Props = {
  movie: Movie;
};
export default function ReviewForm({ movie }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      review: '',
    },
  });
  const [postReview] = usePostReviewMutation();
  const [reviewResponse, setReviewResponse] = useState('');
  const isMobile = useMedia('(max-width: 480px)');

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    setReviewResponse('Posting review...');
    postReview(formData.review)
      .unwrap()
      .then((response) => {
        setReviewResponse(response.message);
      })
      .catch((error) => {
        console.error(error);
        setReviewResponse('Error posting review, please try later');
      });
  };

  const reviewMaxLength = 100;
  return (
    <>
      <h4>{movie.title}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}
        >
          <Controller
            control={control}
            name="review"
            render={({ field }) => (
              <TextField id="review" label="Review" error={!!errors.review} {...field} />
            )}
            rules={{ required: true, maxLength: reviewMaxLength }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mx: 4, my: isMobile ? 2 : 0 }}
            disabled={!!errors.review}
          >
            Submit
          </Button>
          {reviewResponse && <p>{reviewResponse}</p>}
        </Box>
      </form>
    </>
  );
}
