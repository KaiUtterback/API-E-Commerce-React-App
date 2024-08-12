import React, { useState } from 'react';
import axios from 'axios';

const CustomerDelete = ({ customerId }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleDelete = async () => {
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
            console.log(`Customer with ID ${customerId} deleted.`);
            setSuccess('Customer deleted successfully.');
        } catch (error) {
            console.error('Error deleting customer:', error);
            setError('Failed to delete customer.');
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="btn btn-danger">Delete Customer</button>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
        </div>
    );
};

export default CustomerDelete;
