import { useRef, useState } from 'react';
import Particles from 'react-particles-js';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import './App.css';
import { routes, RouteContext } from './contexts/RouteContext';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

const apiURL = process.env.REACT_APP_API_URL;

function App() {
  const [imageLink, setImageLink] = useState('');
  const [boundingBox, setBoundingBox] = useState({});
  const [route, setRoute] = useState(routes.SIGN_IN);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [detectStatus, setDetectStatus] = useState();

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
    const fetchErrMessage = 'Unable to work with API.';

    fetch(`${apiURL}/clarifai/face-detection`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageURL: imageLink,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Increment entries count.
          fetch(`${apiURL}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((putResponse) => putResponse.json())
            .then((entries) => {
              setUser({ ...user, entries });
            });

          return response.json();
        }

        throw new Error(fetchErrMessage);
      })
      .then((data) => {
        setBoundingBox(calculateFaceLocation(data));
      })
      .catch((err) => setErrorMessage(fetchErrMessage))
      .finally(() => setDetectStatus());
  };

  const onSubmitImageLink = (event) => {
    event.preventDefault();
    if (!detectStatus) {
      if (!imageLink?.length) {
        setErrorMessage('Image URL required.');
      } else {
        setDetectStatus('Processing...');
        setErrorMessage();
        fetchClarifaiResponse(imageLink);
      }
    }
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
          setErrorMessage={setErrorMessage}
        />
        {errorMessage && (
          <div className="mb4">
            <Alert
              icon={false}
              severity="error"
              action={
                <Button
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorMessage();
                  }}
                >
                  <div className="dismissButton">Dismiss</div>
                </Button>
              }
            >
              <strong>Error:</strong> {errorMessage}
            </Alert>
          </div>
        )}
        {route === routes.HOME ? (
          <>
            <Logo />
            <Rank user={user} />
            <ImageLinkForm
              onSubmit={onSubmitImageLink}
              setImageLink={setImageLink}
              setBoundingBox={setBoundingBox}
              detectStatus={detectStatus}
            />
            <FaceRecognition
              boundingBox={boundingBox}
              imageLink={imageLink}
              imageRef={imageRef}
            />
          </>
        ) : route === routes.SIGN_IN ? (
          <SignIn
            setUser={setUser}
            signInFormRef={signInFormRef}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <Register
            setUser={setUser}
            registerFormRef={registerFormRef}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </RouteContext.Provider>
  );
}

export default App;
