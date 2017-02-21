import React from 'react';

const Preview = (props) => {
  const { imageUrl, spotUrl, name, previewUrl, playPreview } = props;

  return (
    <div className="track-container" onClick={() => { playPreview(previewUrl); }} >
      {name}
      <img id="art" src={imageUrl} alt="album art" />
      <a id="spotlink" href={spotUrl}>Listen to full track on Spotify</a>
    </div>
  );
};

Preview.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
  spotUrl: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  previewUrl: React.PropTypes.string.isRequired,
  playPreview: React.PropTypes.string.isRequired,
};

export default Preview;
