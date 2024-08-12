import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Product with the provided ID was not found.");
            }
        };

        fetchProduct();
    }, [productId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Product Details</h2>
            <p>Product Name: {product.productName}</p>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default ProductDetails;
