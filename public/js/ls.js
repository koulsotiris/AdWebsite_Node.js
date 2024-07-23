const express = require('express');
const path = require('path');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const sessions = {};

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory user storage
const users = [
  { id: uuid.v4(), username: 'user1', password: 'pass1' },
  { id: uuid.v4(), username: 'user2', password: 'pass2' },
  { id: uuid.v4(), username: 'user3', password: 'pass3' },
  { id: uuid.v4(), username: 'user4', password: 'pass4' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check credentials
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const sessionId = uuid.v4();
    sessions[sessionId] = { username }; // Store the session data

    res.json({ sessionId });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

