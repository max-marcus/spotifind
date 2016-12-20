import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import jsonp from 'jsonp';
import Preview from './preview.jsx';
import EventButton from './eventbutton.jsx';
import EventItem from './eventItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      trackInfo: [],
      audioUrl: null,
      audioObj: null,
      targetArtist: '',
      events: []
    };

    this.newSearch = this.newSearch.bind(this);
    this.newArtist = this.newArtist.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  newArtist(event) {
    this.setState({ artistName: event.target.value });
  }

  newSearch(event) {
    event.preventDefault();
    const artist = this.state.artistName;
    const tracks = this.getTrackArray(artist);
    this.setState({targetArtist: artist})
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
    audioObject.addEventListener('ended', () => {
      this.setState({ audioUrl: null, audioObj: null })
    });
    
  }

  getTrackArray(artistName) {
    axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`)
      .then(res => {
        const id = res.data.artists.items[0].id
        axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
          .then(res => {
            const trackArray = res.data.tracks;
            const data = this.convertToUsableTrackData(trackArray);
            this.setState({ trackInfo: data });
          })
      })
  }

  getEvents(artistName) {
    jsonp(`http://api.bandsintown.com/artists/${artistName}/events.json?api_version=2.0&app_id=YOUR_APP_ID`, null, (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        const eventData = this.convertEventData(data);
        this.setState({ events: eventData })
        console.log(eventData);
      }
    })
  }

  convertToUsableTrackData(array) {
    return array.map((track, i, array) => {
      return i = {
        imageUrl: track.album.images[0].url,
        spotUrl: track['external_urls'].spotify,
        name: track.name,
        preview: track['preview_url']
      }
    });
  }

  convertEventData(array) {
    return array.map((event, i, array) => {
      return i = {
        title: event.title,
        date: event['formatted_datetime'],
        avail: event['ticket_status'],
        tixUrl: event['ticket_url']
      }
    })
  }


  render() {
    const { trackInfo, events } = this.state;
    const tracks = trackInfo.map((track, i) => (
      <Preview key={i} imageUrl={track.imageUrl} spotUrl={track.spotUrl} name={track.name} previewUrl={track.preview} playPreview={this.playPreview} />
    ));

    const eventButton = (
      <EventButton artist={this.state.targetArtist} getEvents={this.getEvents} />
    );

    let eventItems;
    if (events.length < 1) {
      eventItems = (
        <div id="no-events">Bummer, {this.state.targetArtist} has not announced any upcoming shows</div>
      )
    } else {
      eventItems = events.map((event, i) => (
        <EventItem key={i} title={event.title} date={event.date} avail={event.avail} tix={event.tixUrl} />
      ))
    }

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

        <div id="track-area">
          {tracks}
        </div>
        {eventButton}
        <div id="event-area">
        {eventItems}
        </div>
      </div>
    );
  }
}

export default App;