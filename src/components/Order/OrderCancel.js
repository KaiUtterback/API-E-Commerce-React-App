// src/components/Order/OrderCancel.js
import React from 'react';

function OrderCancel({ orderId }) {
  const handleCancel = async () => {
    try {
      // Replace this URL with your actual backend endpoint
      const response = await fetch(`https://api.example.com/orders/${orderId}`, {
        method: 'DELETE', // Assuming DELETE method cancels the order
      });
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      console.log('Order Canceled:', orderId);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <button onClick={handleCancel}>
      Cancel Order
    </button>
  );
}

export default OrderCancel;
