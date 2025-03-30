const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const app = express();
const port = 3003; // Choose an appropriate port

app.use(bodyParser.json());
app.use(cors());

app.get('/get-favourite-ads', async (req, res) => {
  const { username, sessionId } = req.query;

  // Implement authentication logic here (compare username and sessionId)

  // If authentication is successful, return favourite ads from the other server
  if (isAuthenticated(username, sessionId)) {
    try {
      console.log(`Fetching favourite ads for ${username}...`);
      const favouriteAds = await getFavouriteAds(username);
      console.log('Received favourite ads:', favouriteAds);
      res.json(favouriteAds);
    } catch (error) {
      console.error('Error retrieving favourite ads:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
});

function isAuthenticated(username, sessionId) {
  // Implement real authentication logic
  // Return true if authenticated, false otherwise
  return true;
}
async function getFavouriteAds(username) {
  try {
    const firstServerUrl = 'http://localhost:3000/get-favourites';
    console.log(`Sending GET request to ${firstServerUrl} for ${username}...`);
    const response = await httpGet(firstServerUrl, { username });

    // Check the response status
    if (response.statusCode === 200) {
      console.log('Received successful response:', response.body);
      return response.body;
    } else {
      console.error(`Error retrieving favourite ads. Server responded with status ${response.statusCode}`);
      throw new Error(`Error retrieving favourite ads. Server responded with status ${response.statusCode}`);
    }
  } catch (error) {
    console.error('Error in getFavouriteAds:', error);
    throw error; // Rethrow the error to propagate it up
  }
}

function httpGet(url, params) {
  // Helper function to send HTTP GET requests
  return new Promise((resolve, reject) => {
    http.get(`${url}?${new URLSearchParams(params).toString()}`, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log('Request completed successfully.');
        resolve({ statusCode: res.statusCode, body });
      });
    }).on('error', (error) => {
      console.error('Error in httpGet:', error);
      reject(error);
    });
  });
}

app.listen(port, () => {
  console.log(`Favourites Retrieval Service is running at http://localhost:${port}`);
});


