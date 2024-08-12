const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulated in-memory "database" for customers
let customers = [];

// Simulated in-memory "database" for products
let products = [];

// Simulated in-memory "database" for orders
let orders = [];

// --- Customer Routes ---

// Create a new customer
app.post('/api/customers', (req, res) => {
    console.log('Incoming request to /api/customers:', req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        console.log('Missing required fields');
        return res.status(400).send('Missing required fields');
    }

    try {
        const newCustomer = {
            id: customers.length + 1, // Simple auto-incremented ID
            name,
            email,
            phone
        };

        customers.push(newCustomer);

        console.log('Customer Created:', newCustomer);
        console.log('Current Customers:', customers);

        res.status(201).send(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Retrieve all customers
app.get('/api/customers', (req, res) => {
    console.log('Fetching All Customers');
    console.log('Current Customers:', customers);
    
    res.send(customers);
});

// Retrieve a single customer by ID
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        console.log(`Customer with ID ${req.params.id} not found`);
        return res.status(404).send('Customer not found');
    }

    console.log(`Fetching Customer with ID ${req.params.id}:`, customer);

    res.send(customer);
});

// Update a customer by ID
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        console.log(`Customer with ID ${req.params.id} not found`);
        return res.status(404).send('Customer not found');
    }

    const { name, email, phone } = req.body;
    customer.name = name;
    customer.email = email;
    customer.phone = phone;

    console.log(`Customer with ID ${req.params.id} Updated:`, customer);
    console.log('Current Customers:', customers);

    res.send(customer);
});

// Delete a customer by ID
app.delete('/api/customers/:id', (req, res) => {
    const customerIndex = customers.findIndex(c => c.id === parseInt(req.params.id));
    if (customerIndex === -1) {
        console.log(`Customer with ID ${req.params.id} not found`);
        return res.status(404).send('Customer not found');
    }

    const deletedCustomer = customers.splice(customerIndex, 1);

    console.log(`Customer with ID ${req.params.id} Deleted:`, deletedCustomer[0]);
    console.log('Current Customers:', customers);

    res.status(204).send();
});

// --- Product Routes ---

// Create a new product
app.post('/api/products', (req, res) => {
    console.log('Incoming request to /api/products:', req.body);

    const { productName, price } = req.body;

    if (!productName || !price) {
        console.log('Missing required fields');
        return res.status(400).send('Missing required fields');
    }

    try {
        const newProduct = {
            id: products.length + 1, // Simple auto-incremented ID
            productName,
            price
        };

        products.push(newProduct);

        console.log('Product Created:', newProduct);
        console.log('Current Products:', products);

        res.status(201).send(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Retrieve all products
app.get('/api/products', (req, res) => {
    console.log('Fetching All Products');
    console.log('Current Products:', products);
    
    res.send(products);
});

// Retrieve a single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        console.log(`Product with ID ${req.params.id} not found`);
        return res.status(404).send('Product not found');
    }

    console.log(`Fetching Product with ID ${req.params.id}:`, product);

    res.send(product);
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        console.log(`Product with ID ${req.params.id} not found`);
        return res.status(404).send('Product not found');
    }

    const { productName, price } = req.body;
    product.productName = productName;
    product.price = price;

    console.log(`Product with ID ${req.params.id} Updated:`, product);
    console.log('Current Products:', products);

    res.send(product);
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        console.log(`Product with ID ${req.params.id} not found`);
        return res.status(404).send('Product not found');
    }

    const deletedProduct = products.splice(productIndex, 1);

    console.log(`Product with ID ${req.params.id} Deleted:`, deletedProduct[0]);
    console.log('Current Products:', products);

    res.status(204).send();
});

// --- Order Routes ---

// Place a new order
app.post('/api/orders', (req, res) => {
    console.log('Incoming request to /api/orders:', req.body);

    const { customerId, products, orderDate } = req.body;

    // Validate input
    if (!customerId || !products || !Array.isArray(products) || products.length === 0 || !orderDate) {
        console.log('Missing or invalid required fields');
        return res.status(400).send('Missing or invalid required fields');
    }

    try {
        const newOrder = {
            id: orders.length + 1, // Simple auto-incremented ID
            customerId,
            products,
            orderDate
        };

        orders.push(newOrder);

        console.log('Order Placed:', newOrder);
        console.log('Current Orders:', orders);

        res.status(201).send(newOrder);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Retrieve a single order by ID
app.get('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        console.log(`Order with ID ${req.params.id} not found`);
        return res.status(404).send('Order not found');
    }

    const customer = customers.find(c => c.id === parseInt(order.customerId));
    const productNames = order.products.map(productId => {
        const product = products.find(p => p.id === parseInt(productId));
        return product ? product.productName : 'Unknown Product';
    });

    const detailedOrder = {
        ...order,
        customerName: customer ? customer.name : 'Unknown Customer',
        productNames,
    };

    console.log(`Fetching Order with ID ${req.params.id}:`, detailedOrder);

    res.send(detailedOrder);
});

// Update an order by ID
app.put('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        console.log(`Order with ID ${req.params.id} not found`);
        return res.status(404).send('Order not found');
    }

    const { customerId, products, orderDate } = req.body;

    if (!customerId || !products || !orderDate) {
        console.log('Missing required fields');
        return res.status(400).send('Missing required fields');
    }

    order.customerId = customerId;
    order.products = products;
    order.orderDate = orderDate;

    console.log(`Order with ID ${req.params.id} Updated:`, order);
    console.log('Current Orders:', orders);

    res.send(order);
});

// Delete an order by ID
app.delete('/api/orders/:id', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) {
        console.log(`Order with ID ${req.params.id} not found`);
        return res.status(404).send('Order not found');
    }

    const deletedOrder = orders.splice(orderIndex, 1);

    console.log(`Order with ID ${req.params.id} Deleted:`, deletedOrder[0]);
    console.log('Current Orders:', orders);

    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
