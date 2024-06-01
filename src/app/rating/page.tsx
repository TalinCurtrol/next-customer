'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Box, Rating, Button, Toolbar, Container, TextField, Typography } from '@mui/material';

export function RatingPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [id, setId] = useState<string | null>(''); // this is order id
  const searchParams = useSearchParams();

  useEffect(() => {
    const i = searchParams.get('id');
    setId(i);
    // GET request 1:
    // Parameter: order's id (get it directly from 'const [id, setId] = useState<string | null>('');')
    // Response: a json contains rating number and feedback string
    // Those two should be stored with setRating() and setFeedback()
  }, [searchParams]);
  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newRating: number | null
  ) => {
    if (newRating != null) {
      setRating(newRating);
    }
  };

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (event !== undefined) {
      setFeedback(event.target.value);
      console.log(feedback);
    }
  };

  const submitFeedback = () => {
    // Api.post('/customer/orderRating', {rating: rating, feedback: feedback, orderId: params.})
    //     .then((data) => {
    //         console.log('User created:', data);
    //         if (data.code !== 1000) {
    //             enqueueSnackbar(data.msg,  {variant: 'error'})
    //         } else {
    //             enqueueSnackbar('Feedback saved successfully',  {variant: 'success'})
    //             navigate('/OrderLst')
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         enqueueSnackbar('Network error',  {variant: 'error'})
    //     });
    //
    // POST request 2:
    // parameter: {rating: rating, feedback: feedback, orderId: id}
    // Response: nothing data actually, show alert to user
    // This request for customer to submit feedback, you could get data with 'rating' and 'feedback'
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box component="form" noValidate sx={{ flexGrow: 1 }}>
        <Toolbar />
        <div>
          <Typography variant="h6" gutterBottom>
            Order Feedback
          </Typography>
          <div>
            <p>Rate your order: </p>
            <Rating name="order-rating" value={rating} onChange={handleRatingChange} />
          </div>
          <div>
            <p>Feedback:</p>
            <TextField
              label="Feedback"
              multiline
              rows={5}
              value={feedback}
              onChange={handleFeedbackChange}
              sx={{ width: '50ch' }}
            />
          </div>
          <Button
            sx={{ mt: 3, mr: 1 }}
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = '/orders';
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitFeedback}
            sx={{ mt: 3, ml: 1 }}
          >
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
}
export default RatingPage;
