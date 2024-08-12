import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUpdateForm = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const fetchProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProductName(response.data.productName);
            setPrice(response.data.price);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setMessage('Product not found.');
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    const handleUpdateProduct = async () => {
        if (!productId) {
            setMessage('Product ID is missing.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${productId}`, {
                productName,
                price,
            });
            setMessage('Product updated successfully.');
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage('Failed to update product.');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
                <button onClick={() => fetchProduct(productId)}>Fetch Product</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button onClick={handleUpdateProduct}>Update Product</button>
            <p>{message}</p>
        </div>
    );
};

export default ProductUpdateForm;
