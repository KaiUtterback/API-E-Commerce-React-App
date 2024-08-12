import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerUpdateForm({ customerId }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`/api/customers/${customerId}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
            } catch (err) {
                setError('Failed to fetch customer details');
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchCustomer();
        }
    }, [customerId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/customers/${customerId}`, { name, email, phone });
            console.log('Customer Updated:', response.data);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Phone:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <button type="submit">Update Customer</button>
        </form>
    );
}


export default CustomerUpdateForm;
