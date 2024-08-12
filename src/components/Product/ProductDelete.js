import React, { useState } from 'react';
import axios from 'axios';

const ProductDelete = ({ productId }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleDelete = async () => {
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            console.log(`Product with ID ${productId} deleted.`);
            setSuccess('Product deleted successfully.');
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product.');
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="btn btn-danger">Delete Product</button>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
        </div>
    );
};

export default ProductDelete;
