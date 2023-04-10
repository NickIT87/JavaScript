import express from 'express';
import bodyParser from 'body-parser';

// Define our User entity
type User = {
  id: number;
  name: string;
};

// Create our app
const app = express();
app.use(bodyParser.json());

// Initialize our users array
let users: User[] = [];

// Create a user
app.post('/users', (req, res) => {
  const { name } = req.body;
  console.log(req.params);
  if (!name) {
    res.status(400).send('Name is required');
    return;
  }
  const id = users.length + 1;
  const user = { id, name };
  users.push(user);
  res.send(user);
});

// Read a user by ID or Name
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id) || u.name === id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  res.send(user);
});

// List all users
app.get('/users', (req, res) => {
  const userList = users.map(({ id, name }) => ({ id, name }));
  res.send(userList);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));
  if (userIndex === -1) {
    res.status(404).send('User not found');
    return;
  }
  users[userIndex].name = name || users[userIndex].name;
  res.send(users[userIndex]);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

