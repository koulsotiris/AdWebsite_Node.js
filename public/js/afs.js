// const { loginDataArray, login } = require('./login.js');
// console.log('LOG IN ARRAY',loginDataArray);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

// Explicitly allow Content-Type header
app.options('/add-to-favourites', cors({
  allowedHeaders: ['Content-Type'],
}));

// Υποθετική βάση δεδομένων για τις αγαπημένες αγγελίες των χρηστών
const favourites = {};


app.get('/get-favourites', (req, res) => {
  const { username, sessionId } = req.query;

  // Check user authentication based on sessionId
  if (isAuthenticated(username, sessionId)) {
    const userFavorites = favourites[username] || {};
    res.status(200).json(userFavorites);
  } else {
    res.status(401).json({ message: 'Unauthorized attempt to access favorites.' });
  }
});


// Υπηρεσία για προσθήκη αγγελίας στα αγαπημένα
app.post('/add-to-favourites', (req, res) => {
  console.log('Received POST request to /add-to-favourites:', req.body);

  const { adId, adTitle, adDescription, adCost, adImage, username, sessionId } = req.body;

  // Έλεγχος αυθεντικοποίησης χρήστη βάσει του sessionId
  // Υποθετικός έλεγχος - πρέπει να υλοποιηθεί η πραγματική αυθεντικοποίηση
  if (isAuthenticated(username, sessionId)) {
    // Έλεγχος για διπλοκαταχώρηση
    if (!favourites[username] || !favourites[username][adId]) {
      // Προσθήκη στις αγαπημένες
      favourites[username] = favourites[username] || {};
      favourites[username][adId] = {
        id: adId,
        title: adTitle,
        description: adDescription,
        cost: adCost,
        image: adImage,
      };

      res.status(200).json({ message: 'Η αγγελία προστέθηκε στα αγαπημένα.' });
    } else {
      res.status(400).json({ message: 'Η αγγελία είναι ήδη στα αγαπημένα.' });
    }
  } else {
    res.status(401).json({ message: 'Μη εξουσιοδοτημένη προσπάθεια προσθήκης αγγελίας στα αγαπημένα.' });
  }

  console.log('Sending response:', res.statusCode, res.statusMessage);
});

// Υποθετική συνάρτηση ελέγχου αυθεντικοποίησης
function isAuthenticated(username, sessionId) {
  // console.log('LOG IN ARRAY',loginDataArray);
  // for (const entry of loginDataArray) {
  //   if (entry.username === username && entry.sessionId === sessionId) {
  //     return true; // Authentication successful
  //   }
  // }

  // return false; // Authentication failed/
  return true;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = favourites;


