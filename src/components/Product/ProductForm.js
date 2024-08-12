import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:5000/api/products', { productName, price });
            console.log('Product Added:', response.data);
            setSuccess('Product added successfully.');
            setProductName('');
            setPrice('');
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Failed to add product.');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
            </form>
        </div>
    );
};

export default ProductForm;
