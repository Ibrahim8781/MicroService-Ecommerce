require('dotenv').config();
const express = require('express');
const app = express();
const port = 3002;

const products = [
  { id: 101, name: 'Widget', price: 9.99 },
  { id: 102, name: 'Gadget', price: 19.99 },
];

// Welcome message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Products service is running' });
});

app.use(express.json());
app.get('/health', (req, res) => res.send('Products OK'));
app.get('/products', (req, res) => res.json(products));
app.get('/products/:id', (req, res) => {
  const p = products.find(x => x.id === +req.params.id);
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

app.listen(port, () => console.log(`Products service on ${port}`));