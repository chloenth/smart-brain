import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Form from './components/Form/Form';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const onInputChange = (e) => {
    setBox({});
    setImageUrl(e.target.value);
  };

  const calculateFaceLocation = (clarifaiFace) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const onImageSubmit = () => {
    fetch('http://localhost:3001/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, imageUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({ ...user, entries: data.entries });
        const displayFaceBox = calculateFaceLocation(data.clarifaiFace);
        setBox(displayFaceBox);
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === 'signin') {
      setIsSignedIn(false);
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      });
      setImageUrl('');
      setBox({});
    } else if (route === 'home') setIsSignedIn(true);
    setRoute(route);
  };

  return (
    <div className='App'>
      <ParticlesBg
        type='fountain'
        bg={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          height: 1320,
        }}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onImageSubmit={onImageSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : (
        <Form route={route} onRouteChange={onRouteChange} loadUser={setUser} />
      )}
    </div>
  );
}

export default App;
