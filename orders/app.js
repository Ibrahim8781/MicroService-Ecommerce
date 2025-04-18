require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Orders service is running' });
});

app.get('/health', (req, res) => res.send('Orders OK'));


// Create a new order
app.post('/orders', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // Fetch user
        const u = await axios.get(`${process.env.USERS_URL}/users/${userId}`);
        // Fetch product
        const p = await axios.get(`${process.env.PRODUCTS_URL}/products/${productId}`);

        const total = p.data.price * quantity;
        const order = {
            id: Date.now(),
            user: u.data,
            product: p.data,
            quantity,
            total,
        };

        // In real app, save to DB. Here we return it directly.
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: 'Failed to create order' });
    }
});

app.listen(port, () => console.log(`Orders service on ${port}`));