import React, { useState } from 'react';
import axios from 'axios';

const OrderDetails = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
            setOrder(response.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error fetching order details:", err);
            setError('Order not found');
            setOrder(null); // Clear any previous order data
        }
    };

    return (
        <div>
            <div>
                <h3>Order Details</h3>
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button onClick={fetchOrder}>Search</button>

                {error && <p>{error}</p>}
                {order && (
                    <div>
                        <p>Order ID: {order.id}</p>
                        <p>Customer Name: {order.customerName}</p>
                        <p>Customer ID: {order.customerId}</p>
                        <p>Products: {order.products.join(', ')}</p>
                        <p>Order Date: {order.orderDate}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
