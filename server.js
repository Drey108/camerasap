const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

const mongoUri = process.env.MONGODB_URI;

// MongoDB client instance
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
let dbStatus = 'Not connected';

client.connect()
  .then(() => {
    dbStatus = 'Connected to MongoDB';
  })
  .catch(err => {
    dbStatus = 'Failed to connect to MongoDB';
    console.error(err);
  });

// Home route to display database connection status
app.get('/', (req, res) => {
  res.send(`Database connection status: ${dbStatus}`);
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
