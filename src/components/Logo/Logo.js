import React from 'react';
import brainImg from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <div className="logo-wrapper br2 shadow-2 grow">
        <div className="pa3">
          <img className="logo-img" alt="logo" src={brainImg} />
        </div>
      </div>
    </div>
  );
};

export default Logo;
