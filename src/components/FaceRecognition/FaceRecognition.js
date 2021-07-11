import React from 'react';

const FaceRecognition = ({ imageLink }) => {
  return (
    <div className="center ma">
      <div className="absolute mt4">
        <img alt="" src={imageLink} width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
