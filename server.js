// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// ───── MongoDB Connection ─────
const mongoURI = 'mongodb://localhost:27017/ads_app'; // Or use MongoDB Atlas URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ───── Mongoose Schema ─────
const favouriteSchema = new mongoose.Schema({
  username: String,
  adId: String,
  adTitle: String,
  adDescription: String,
  adCost: Number,
  adImage: String
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

// ───── Middleware ─────
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

// ───── Add to Favourites (MongoDB) ─────

app.post('/add-to-favourites', async (req, res) => {
  const { adId, adTitle, adDescription, adCost, adImage, username, sessionId } = req.body;

  if (sessions[sessionId]?.username === username) {
    try {
      const existing = await Favourite.findOne({ username, adId });
      if (existing) {
        return res.status(400).json({ message: 'Η αγγελία είναι ήδη στα αγαπημένα.' });
      }

      const newFav = new Favourite({ username, adId, adTitle, adDescription, adCost, adImage });
      await newFav.save();

      // Add this to confirm it's working
      console.log('Ad saved to MongoDB:', newFav);

      return res.status(200).json({ message: 'Η αγγελία προστέθηκε στα αγαπημένα.' });
    } catch (error) {
      console.error('Error saving to MongoDB:', error);
      return res.status(500).json({ message: 'Σφάλμα αποθήκευσης στα αγαπημένα.' });
    }
  } else {
    return res.status(401).json({ message: 'Μη εξουσιοδοτημένη προσπάθεια προσθήκης.' });
  }
});


// ───── Return Favourites (MongoDB) ─────
app.get('/get-favourites', async (req, res) => {
  const { username, sessionId } = req.query;
  if (sessions[sessionId]?.username === username) {
    try {
      const favourites = await Favourite.find({ username });
      return res.status(200).json(favourites);
    } catch (err) {
      return res.status(500).json({ message: 'Σφάλμα ανάκτησης αγαπημένων.' });
    }
  }
  res.status(401).json({ message: 'Unauthorized attempt to access favorites.' });
});

// ───── Proxy Endpoint ─────
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

// ───── Delete Favourites ─────
app.delete('/remove-from-favourites', async (req, res) => {
  const { adId, username, sessionId } = req.body;
  if (sessions[sessionId]?.username === username) {
    try {
      await Favourite.deleteOne({ username, adId });
      return res.status(200).json({ message: 'Η αγγελία αφαιρέθηκε από τα αγαπημένα.' });
    } catch (err) {
      return res.status(500).json({ message: 'Σφάλμα κατά την αφαίρεση της αγγελίας.' });
    }
  }
  res.status(401).json({ message: 'Μη εξουσιοδοτημένη πρόσβαση.' });
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
