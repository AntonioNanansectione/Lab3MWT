const express = require('express');
const _ = require('lodash');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for React client
app.use(cors());
app.use(express.json());

// Sample image data (actual URLs)
const images = [
  'https://images.unsplash.com/photo-1682685797769-481b48222adf',
  'https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1294&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1680553492268-516537c44d91?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1633621412960-6df85eff8c85?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// Route to get multiple random images
app.get('/api/random-images', (req, res) => {
  const randomImages = _.sampleSize(images, 3); // Get 3 random images
  res.json(randomImages);
});

// Route to upload a dog image
app.post('/api/upload-dog-image', (req, res) => {
  const { imageUrl } = req.body;
  if (imageUrl) {
    console.log('Dog image uploaded:', imageUrl);
    res.json({ message: 'Dog image uploaded successfully!' });
  } else {
    res.status(400).json({ error: 'No image URL provided' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});