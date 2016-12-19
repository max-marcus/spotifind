import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      usableData: []
    };

    this.newSearch = this.newSearch.bind(this);
    this.newArtist = this.newArtist.bind(this);
  }

  newArtist(event) {
    this.setState({artistName: event.target.value});
  }

  newSearch(event) {
    event.preventDefault();
    const tracks = this.getTrackArray(this.state.artistName);
  }

  getTrackArray(artistName) {
    axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`)
      .then(res => {
        const id = res.data.artists.items[0].id
        axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
          .then(res => {
            const trackArray = res.data.tracks;
            const data = this.convertToUsableData(trackArray);
            this.setState({usableData: data});
            console.log(this.state);
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
    const { usableData } = this.state;


    return (
      <div id="main">
        <form id="search-form" onSubmit={this.newSearch}>
          <label>
            Search for an artist:
            <input type="text" value={this.state.artistName} onChange={this.newArtist} />
          </label>
          <input type="submit" value="Search" />
        </form>

        
      </div>
    );
  }
}

export default App;