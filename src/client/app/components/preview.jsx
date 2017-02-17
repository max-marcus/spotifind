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
  imageUrl: React.PropTypes.string,
  spotUrl: React.PropTypes.string,
  name: React.PropTypes.string,
  previewUrl: React.PropTypes.string,
  playPreview: React.PropTypes.string,
};

export default Preview;
