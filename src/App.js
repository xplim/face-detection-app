import { useRef, useState } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import { routes, RouteContext } from './contexts/RouteContext';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

const apiURL = 'http://localhost:4000';

function App() {
  const [imageLink, setImageLink] = useState('');
  const [boundingBox, setBoundingBox] = useState({});
  const [route, setRoute] = useState(routes.SIGN_IN);
  const [, setUser] = useState({});

  const imageRef = useRef();
  const registerFormRef = useRef();
  const signInFormRef = useRef();

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = imageRef.current;
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: (1 - clarifaiFace.right_col) * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: (1 - clarifaiFace.bottom_row) * height,
    };
  };

  const fetchClarifaiResponse = (imageLink) => {
    fetch(`${apiURL}/clarifai/face-detection`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageURL: imageLink,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Unable to work with API');
      })
      .then((data) => {
        setBoundingBox(calculateFaceLocation(data));
      })
      .catch((err) => {
        // TODO: Handle error.
      });
  };

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
    <RouteContext.Provider value={{ route, routes, setRoute }}>
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          registerFormRef={registerFormRef}
          signInFormRef={signInFormRef}
          setImageLink={setImageLink}
          setUser={setUser}
        />
        {route === routes.HOME ? (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onSubmit={onSubmit}
              setImageLink={setImageLink}
              setBoundingBox={setBoundingBox}
            />
            <FaceRecognition
              boundingBox={boundingBox}
              imageLink={imageLink}
              imageRef={imageRef}
            />
          </>
        ) : route === routes.SIGN_IN ? (
          <SignIn signInFormRef={signInFormRef} />
        ) : (
          <Register setUser={setUser} registerFormRef={registerFormRef} />
        )}
      </div>
    </RouteContext.Provider>
  );
}

export default App;
