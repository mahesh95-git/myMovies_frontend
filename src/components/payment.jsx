import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OVWObSDiFyOgTd9aTVfMZ7lOX96Wi9h2tbBs34BJ8Z24lXKWbLMLejITnc8Eto6RWagWVqlXlH1lqXjFFMJHKNP00DlmmFJnk');

export const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentResponse, setPaymentResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;

    // Create a PaymentIntent on the server
    const response = await fetch(`http://localhost:4000/api/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();
console.log(clientSecret)
    // Confirm the payment on the client-side
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        // card: elements.getElement(CardElement),
        billing_details: {
          // Include billing details if needed
        },
      },
    });

    if (paymentIntent.status === 'succeeded') {
      setPaymentResponse('Payment successful!');
    } else {
      setPaymentResponse('Payment failed.');
    }
  };

  return (
    <div>
      <h1>Stripe Payments Demo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Enter Amount (in cents):</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        /><br /><br />
        
        <div id="card-element">
          {/* Element for Stripe.js */}
        </div>
        
        <button type="submit">Pay</button>
      </form>
      
      <div id="payment-response">{paymentResponse}</div>
    </div>
  );
};


