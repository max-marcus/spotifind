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
      audioUrl: null,
      audioObj: null
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
    const curAudio = this.state.audioObj;
    if (this.state.audioUrl === null) {
      audioObject.play();
      this.setState({ audioUrl: url, audioObj: audioObject })
    } else if (this.state.audioUrl === url) {
      if (!curAudio.paused) curAudio.pause();
      else curAudio.play();
    } else if (this.state.audioUrl !== url) {
      curAudio.pause();
      audioObject.play();
      this.setState({ audioUrl: url, audioObj: audioObject })
    }
    // else if (this.state.audio ===)
    audioObject.addEventListener('ended', () => {
      this.setState({ audioUrl: null, audioObj: null })
    });
    // audioObject.addEventListener('pause', () => {
    //   console.log('prepause: ', this.state.audioUrl);
    //   this.setState({ audioUrl: null, audioObj: null })
    // });
    
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