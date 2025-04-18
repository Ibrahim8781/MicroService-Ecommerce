require('dotenv').config();
const express = require('express');
const app = express();
const port = 3003;

// In-memory users
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

app.use(express.json());

// Welcome message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Users service is running' });
});

// Health check
app.get('/health', (req, res) => res.send('Users OK'));

// List all users
app.get('/users', (req, res) => res.json(users));

// Get user by ID
app.get('/users/:id', (req, res) => {
  const u = users.find(x => x.id === +req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});

app.listen(port, () => console.log(`Users service on ${port}`));