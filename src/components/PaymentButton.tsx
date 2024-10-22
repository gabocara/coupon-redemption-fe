// components/PaymentButton.tsx
import React from 'react';
import { buy } from '../services/buyService';

const PaymentButton: React.FC = () => {
  const handlePayment = async () => {
    try {
      const response = await buy();
      alert('Payment successful: ' + response);
    } catch (error) {
      alert('Payment failed: ' + error);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
