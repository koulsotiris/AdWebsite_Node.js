// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ───── In-memory storage ─────
const users = [
  { id: uuid.v4(), username: 'user1', password: 'pass1' },
  { id: uuid.v4(), username: 'user2', password: 'pass2' },
  { id: uuid.v4(), username: 'user3', password: 'pass3' },
  { id: uuid.v4(), username: 'user4', password: 'pass4' }
];
const sessions = {};
const favourites = {};

// ───── Static Pages ─────
app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/ad', (_, res) => res.sendFile(path.join(__dirname, 'public', 'home-rentals.html')));
app.get('/ad-details', (_, res) => res.sendFile(path.join(__dirname, 'public', 'home-rentals-details.html')));
app.get('/js/Category.js', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js', 'Category.js'), {
    headers: { 'Content-Type': 'application/javascript' }
  });
});

// ───── Login ─────
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const sessionId = uuid.v4();
    sessions[sessionId] = { username };
    return res.json({ sessionId });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// ───── Add to Favourites ─────
app.post('/add-to-favourites', (req, res) => {
  const { adId, adTitle, adDescription, adCost, adImage, username, sessionId } = req.body;
  if (sessions[sessionId]?.username === username) {
    favourites[username] = favourites[username] || {};
    if (!favourites[username][adId]) {
      favourites[username][adId] = { id: adId, title: adTitle, description: adDescription, cost: adCost, image: adImage };
      return res.status(200).json({ message: 'Η αγγελία προστέθηκε στα αγαπημένα.' });
    } else {
      return res.status(400).json({ message: 'Η αγγελία είναι ήδη στα αγαπημένα.' });
    }
  }
  res.status(401).json({ message: 'Μη εξουσιοδοτημένη προσπάθεια προσθήκης.' });
});

// ───── Return Raw Favourites ─────
app.get('/get-favourites', (req, res) => {
  const { username, sessionId } = req.query;
  if (sessions[sessionId]?.username === username) {
    return res.status(200).json(favourites[username] || {});
  }
  res.status(401).json({ message: 'Unauthorized attempt to access favorites.' });
});

// ───── Proxy Endpoint  ─────
app.get('/get-favourite-ads', async (req, res) => {
  const { username, sessionId } = req.query;
  if (sessions[sessionId]?.username === username) {
    try {
      const result = await httpGet(`http://localhost:${port}/get-favourites`, { username, sessionId });
      if (result.statusCode === 200) {
        return res.status(200).send(result.body);
      }
      return res.status(result.statusCode).json({ message: 'Failed to fetch favourites' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  res.status(401).json({ message: 'Unauthorized access' });
});

// ───── Internal HTTP GET ─────
function httpGet(url, params) {
  return new Promise((resolve, reject) => {
    http.get(`${url}?${new URLSearchParams(params).toString()}`, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    }).on('error', reject);
  });
}

// ───── Start ─────
app.listen(port, () => {
  console.log(`Unified server running at http://localhost:${port}`);
});
