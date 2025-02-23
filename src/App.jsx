import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [dogImage, setDogImage] = useState('');

  // Fetch random images from the Express server
  const fetchRandomImages = async () => {
    const response = await fetch('http://localhost:5000/api/random-images');
    const data = await response.json();
    setImages(data);
  };

  // Fetch a random dog image from the Dog API
  const fetchRandomDogImage = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setDogImage(data.message);
  };

  // Upload the dog image to the Express server
  const uploadDogImage = async () => {
    if (dogImage) {
      const response = await fetch('http://localhost:5000/api/upload-dog-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: dogImage }),
      });
      const data = await response.json();
      console.log(data.message);
      alert(data.message); // Notify the user
    }
  };

  // Fetch random images on component mount
  useEffect(() => {
    fetchRandomImages();
  }, []);

  return (
    <div className="App">
      <h1>Random Images</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Random ${index}`} />
        ))}
      </div>

      <h2>Random Dog Image</h2>
      <button onClick={fetchRandomDogImage}>Get Random Dog Image</button>
      {dogImage && (
        <>
          <img src={dogImage} alt="Random Dog" className="dog-image" />
          <button onClick={uploadDogImage}>Upload Dog Image</button>
        </>
      )}
    </div>
  );
}

export default App;