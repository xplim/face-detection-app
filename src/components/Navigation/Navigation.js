import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';

const Navigation = () => {
  const { route, routes, setRoute } = useContext(RouteContext);

  if (route === routes.HOME) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => setRoute(routes.SIGN_IN)}
        >
          Sign Out
        </p>
      </nav>
    );
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => setRoute(routes.SIGN_IN)}
      >
        Sign In
      </p>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => setRoute(routes.REGISTER)}
      >
        Register
      </p>
    </nav>
  );
};

export default Navigation;
