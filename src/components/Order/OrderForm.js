import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [products, setProducts] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:5000/api/orders', { customerId, products: products.split(','), orderDate });
            console.log('Order Placed:', response.data);
            setSuccess('Order placed successfully.');
            setCustomerId('');
            setProducts('');
            setOrderDate('');
        } catch (error) {
            console.error('Error placing order:', error);
            setError('Failed to place order.');
        }
    };

    return (
        <div>
            <h2>Place Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product IDs (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Order Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Place Order</button>
                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
            </form>
        </div>
    );
};

export default OrderForm;
