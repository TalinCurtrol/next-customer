import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// ****this value should be store in database or backend
const stripePromise = loadStripe(
  'pk_test_51Jk5NZLE22eIGJeaIsJ9ARXQ4tS2VOAXg88wkR5yCZTs77gKvISaPPXCCeKgnhzrB6dtWmEDUStbwRppbAv1vv74000e9NYg4w'
);

export default function StripePayment(allData) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // allData is all the data we collect before
    //
    //
    //
    // console.log('createPayment');
    // axios
    //   .post('http://127.0.0.1:5000/create-payment-intent', {
    //     allData: allData,
    //   })
    //   .then((res) => {
    //     const cs = res.data;
    //     console.log(cs.clientSecret);
    //     setClientSecret(cs.clientSecret);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <h2>Payment</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
