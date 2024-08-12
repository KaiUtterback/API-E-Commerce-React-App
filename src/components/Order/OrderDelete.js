import React, { useState } from 'react';
import axios from 'axios';

const OrderDelete = () => {
    const [orderId, setOrderId] = useState('');
    const [message, setMessage] = useState('');

    const handleDeleteOrder = async () => {
        if (!orderId) {
            setMessage('Order ID is missing.');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
            setMessage('Order deleted successfully.');
            setOrderId(''); // Clear the input field after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
            setMessage('Failed to delete order.');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
            </div>
            <button onClick={handleDeleteOrder}>Delete Order</button>
            <p>{message}</p>
        </div>
    );
};

export default OrderDelete;
