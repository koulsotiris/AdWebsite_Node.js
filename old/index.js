const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes for different HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ad', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home-rentals.html'));
});

app.get('/ad-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home-rentals-details.html'));
});

// Set the proper content type for JavaScript files
app.get('/js/category.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js', 'category.js'), {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
