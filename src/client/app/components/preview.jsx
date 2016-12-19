import React, { Component } from 'react';

const Preview = (props) => {
  const { imageUrl, spotUrl, name, previewUrl } = props;

  return (
    <div className="track-container">
      {name}
      <img id="art" src={imageUrl} />
      <a id="spotlink" href={spotUrl}>Listen to full track on Spotify</a>
    </div>
  )
}

export default Preview;