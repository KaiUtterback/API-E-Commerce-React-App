import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetails = ({ customerId }) => {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
                setCustomer(response.data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Customer not found.');
            }
        };

        fetchCustomer();
    }, [customerId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!customer) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Customer Details</h2>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
        </div>
    );
};

export default CustomerDetails;
