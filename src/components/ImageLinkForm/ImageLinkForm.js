import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onSubmit, setImageLink }) => {
  return (
    <div>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>

      <div className="center">
        <form
          className="form center pa4 br3 shadow-5"
          onSubmit={(event) => onSubmit(event)}
        >
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={(event) => setImageLink(event.target.value)}
          />
          <button className="w-30 grow f4 link ph3 pv2 dib black bg-light-yellow">
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
