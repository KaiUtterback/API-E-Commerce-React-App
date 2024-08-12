import React, { useState } from 'react';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import CustomerUpdateForm from './components/Customer/CustomerUpdateForm';
import CustomerDelete from './components/Customer/CustomerDelete';

import ProductForm from './components/Product/ProductForm';
import ProductDetails from './components/Product/ProductDetails';
import ProductUpdateForm from './components/Product/ProductUpdateForm';
import ProductDelete from './components/Product/ProductDelete';

import OrderForm from './components/Order/OrderForm';
import OrderDetails from './components/Order/OrderDetails';
import OrderUpdateForm from './components/Order/OrderUpdateForm';
import OrderDelete from './components/Order/OrderDelete';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [orderId, setOrderId] = useState('');

    return (
        <div className="App container mt-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <a className="navbar-brand" href="/">E-Commerce Management</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#customerManagement">Customer Management</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#productManagement">Product Management</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#orderManagement">Order Management</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Customer Management */}
            <div id="customerManagement" className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Customer Management</h2>
                    <CustomerForm />
                    <hr />
                    
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Enter Customer ID"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                        />
                        <CustomerDetails customerId={customerId} />
                    </div>
                    <hr />
                    <h3>Update Customer Details</h3>
                    <CustomerUpdateForm customerId={customerId} />
                    <hr />
                    <h3>Delete Customer</h3>
                    <CustomerDelete customerId={customerId} />
                </div>
            </div>

            {/* Product Management */}
            <div id="productManagement" className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Product Management</h2>
                    <ProductForm />
                    <hr />
                    <h3>View Product Details</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Enter Product ID"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                        <ProductDetails productId={productId} />
                    </div>
                    <hr />
                    <h3>Update Product Details</h3>
                    <ProductUpdateForm productId={productId} />
                    <hr />
                    <h3>Delete Product</h3>
                    <ProductDelete productId={productId} />
                </div>
            </div>

            {/* Order Management */}
            <div id="orderManagement" className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Order Management</h2>
                    <OrderForm />
                    <hr />
                    
                    <div className="form-group">
                        <OrderDetails orderId={orderId} />
                    </div>
                    <hr />
                    <h3>Update Order Details</h3>
                    <OrderUpdateForm orderId={orderId} />
                    <hr />
                    <h3>Cancel Order</h3>
                    <OrderDelete orderId={orderId} />
                </div>
            </div>
        </div>
    );
}

export default App;
