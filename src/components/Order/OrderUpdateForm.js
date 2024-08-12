import React, { useState } from 'react';
import axios from 'axios';

const OrderUpdateForm = () => {
    const [orderId, setOrderId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
            const order = response.data;
            setCustomerId(order.customerId);
            setOrderDate(order.orderDate);
            setError(null);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setError("Order not found.");
        }
    };

    const handleUpdate = async () => {
        if (!orderId) {
            setError("Order ID is required for updating an order.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
                customerId,
                orderDate,
            });
            console.log("Order Updated:", response.data);
            setError(null);
        } catch (error) {
            console.error("Error updating order:", error);
            setError("Failed to update order.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
            />
            <button onClick={fetchOrder}>Fetch Order</button>

            {error && <p>{error}</p>}

            {orderId && (
                <div>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div>
                            <label>Customer ID</label>
                            <input
                                type="text"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Order Date</label>
                            <input
                                type="date"
                                value={orderDate}
                                onChange={(e) => setOrderDate(e.target.value)}
                            />
                        </div>
                        <button type="submit">Update Order</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OrderUpdateForm;
