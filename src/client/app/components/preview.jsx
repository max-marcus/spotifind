import React, { Component } from 'react';

const Preview = (props) => {
  const { imageUrl, spotUrl, name, previewUrl, playPreview } = props;

  return (
    <div className="track-container" onClick={() => {playPreview(previewUrl)}} >
      {name}
      <img id="art" src={imageUrl} alt="album art" />
      <a id="spotlink" href={spotUrl}>Listen to full track on Spotify</a>
    </div>
  )
}

export default Preview;