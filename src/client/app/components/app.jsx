import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Preview from './preview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      trackInfo: [],
      audioUrl: null
    };

    this.newSearch = this.newSearch.bind(this);
    this.newArtist = this.newArtist.bind(this);
    this.playPreview = this.playPreview.bind(this);
  }

  newArtist(event) {
    this.setState({ artistName: event.target.value });
  }

  newSearch(event) {
    event.preventDefault();
    const tracks = this.getTrackArray(this.state.artistName);
  }

  playPreview(url) {
    const audioObject = new Audio(url);
    if (this.state.audioUrl === null) {
      audioObject.play();
      this.setState({ audioUrl: url })
    }
    else if (this.state.audioUrl === url) {
      audioObject.pause();
    }
    // else if (this.state.audio ===)
    audioObject.addEventListener('ended', () => {
      console.log(this.state.audioUrl);
      this.setState({ audioUrl: null })
      console.log('ended: ', this.state.audioUrl);
    });
    audioObject.addEventListener('pause', () => {
      this.setState({ audioUrl: null })
      console.log('paused: ', this.state.audioUrl);
    });
    
  }

  getTrackArray(artistName) {
    axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`)
      .then(res => {
        const id = res.data.artists.items[0].id
        axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
          .then(res => {
            const trackArray = res.data.tracks;
            const data = this.convertToUsableData(trackArray);
            this.setState({ trackInfo: data });
          })
      })
  }

  convertToUsableData(array) {
    return array.map((track, i, array) => {
      return i = {
        imageUrl: track.album.images[0].url,
        spotUrl: track['external_urls'].spotify,
        name: track.name,
        preview: track['preview_url']
      }
    });
  }


  render() {
    const { trackInfo } = this.state;
    const tracks = trackInfo.map((track, i) => (
      <Preview key={i} imageUrl={track.imageUrl} spotUrl={track.spotUrl} name={track.name} previewUrl={track.preview} playPreview={this.playPreview} />
    ));

    return (
      <div id="main">
        <form id="search-form" onSubmit={this.newSearch}>
          <label>
            SEARCH FOR AN ARTIST:
            <br/>
            <input id="search-box" type="text" value={this.state.artistName} onChange={this.newArtist} />
          </label>
          <input type="submit" value="Search" />
        </form>

        <div id="content-area">
          {tracks}
        </div>
      </div>
    );
  }
}

export default App;