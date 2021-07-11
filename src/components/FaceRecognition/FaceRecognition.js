import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boundingBox, imageLink, imageRef }) => {
  return (
    <div className="center ma">
      <div className="absolute mt4">
        <img
          alt=""
          src={imageLink}
          ref={imageRef}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            left: boundingBox.leftCol,
            right: boundingBox.rightCol,
            top: boundingBox.topRow,
            bottom: boundingBox.bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
