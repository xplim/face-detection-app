import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({
  onSubmit,
  setImageLink,
  setBoundingBox,
  detectStatus,
}) => {
  return (
    <div className="main-section">
      <p className="f4 line-break">
        {`This Magic Brain will detect faces in your pictures.
          Give it a try.`}
      </p>

      <div className="center">
        <form
          className="form center pa4 br3 shadow-5"
          onSubmit={(event) => onSubmit(event)}
        >
          <input
            className="f6 pa2 w-70 center"
            type="text"
            placeholder="Enter image URL."
            onChange={(event) => {
              // Set image link to load new image.
              setImageLink(event.target.value);

              // Clear previous bounding box when loading new image.
              setBoundingBox({});
            }}
          />
          <button
            className={`w-30 f6 link ph3 pv2 dib black ${
              detectStatus ? 'bg-light-gray' : 'bg-light-yellow grow'
            }`}
            disabled={detectStatus}
          >
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
