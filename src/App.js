import { useState } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';

const apiURL = 'http://localhost:4000';

const fetchClarifaiResponse = (imageLink) => {
  fetch(`${apiURL}/clarifai/face-detection`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageURL: imageLink,
    }),
  })
    .then((response) => {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    })
    .catch((err) => {
      // TODO: Handle error.
    });
};

function App() {
  const [imageLink, setImageLink] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    fetchClarifaiResponse(imageLink);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      line_linked: {
        opacity: 0.7,
        width: 1,
      },
    },
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} setImageLink={setImageLink} />
      <FaceRecognition imageLink={imageLink} />
    </div>
  );
}

export default App;
