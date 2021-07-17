import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';

const Navigation = ({
  registerFormRef,
  signInFormRef,
  setImageLink,
  setUser,
  setErrorMessage,
}) => {
  const { route, routes, setRoute } = useContext(RouteContext);

  if (route === routes.HOME) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          className="f4 mt1 mb1 link dim black underline pa3 pointer"
          onClick={() => {
            setImageLink('');
            setUser({});
            setErrorMessage();
            setRoute(routes.SIGN_IN);
          }}
        >
          Sign Out
        </p>
      </nav>
    );
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f4 link dim black underline pa3 pointer"
        onClick={() => {
          // Depending on the App state, `current` could be undefined.
          signInFormRef.current?.reset();
          setErrorMessage();
          setRoute(routes.SIGN_IN);
        }}
      >
        Sign In
      </p>
      <p
        className="f4 link dim black underline pa3 pointer"
        onClick={() => {
          // Depending on the App state, `current` could be undefined.
          registerFormRef.current?.reset();
          setErrorMessage();
          setRoute(routes.REGISTER);
        }}
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
