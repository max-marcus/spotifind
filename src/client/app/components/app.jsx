import React, { Component } from 'react';
import axios from 'axios';
import Preview from './preview.jsx';
import EventButton from './eventbutton.jsx';
import EventItem from './eventItem.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      trackInfo: [],
      audioUrl: null,
      audioObj: null,
      events: null,
    };

    this.newSearch = this.newSearch.bind(this);
    this.newArtist = this.newArtist.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents() {
    const artistName = this.state.artistName;
    axios.get(`/getEvents?artist=${artistName}`)
      .then((res) => {
        const eventData = this.convertEventData(res.data);
        this.setState({ events: eventData });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTrackArray(artistName) {
    axios.get(`/getTracks?artist=${artistName}`)
      .then((res) => {
        const trackArray = res.data.tracks;
        const data = this.convertToUsableTrackData(trackArray);
        this.setState({ trackInfo: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  playPreview(url) {
    const audioObject = new Audio(url);
    const curAudio = this.state.audioObj;
    if (this.state.audioUrl === null) {
      audioObject.play();
      this.setState({ audioUrl: url, audioObj: audioObject });
    } else if (this.state.audioUrl === url) {
      if (!curAudio.paused) curAudio.pause();
      else curAudio.play();
    } else if (this.state.audioUrl !== url) {
      curAudio.pause();
      audioObject.play();
      this.setState({ audioUrl: url, audioObj: audioObject });
    }
    audioObject.addEventListener('ended', () => {
      this.setState({ audioUrl: null, audioObj: null });
    });
  }

  newArtist(event) {
    this.setState({ artistName: event.target.value });
  }

  newSearch(event) {
    event.preventDefault();
    const artist = this.state.artistName;
    this.getTrackArray(artist);
    this.setState({ targetArtist: artist, events: null });
  }

  convertToUsableTrackData(array) {
    return array.map((track) => {
      const data = {
        imageUrl: track.album.images[0].url,
        spotUrl: track.external_urls.spotify,
        name: track.name,
        preview: track.preview_url,
      };
      return data;
    });
  }

  convertEventData(array) {
    return array.map((event) => {
      const data = {
        title: event.title,
        date: event.formatted_datetime,
        avail: event.ticket_status,
        tixUrl: event.ticket_url,
      };
      return data;
    });
  }


  render() {
    const { trackInfo, events } = this.state;
    const tracks = trackInfo.map(track => (
      <Preview
        key={track.spotUrl}
        imageUrl={track.imageUrl}
        spotUrl={track.spotUrl}
        name={track.name}
        previewUrl={track.preview}
        playPreview={this.playPreview}
      />
    ));

    const eventButton = (
      <EventButton
        artist={this.state.targetArtist}
        getEvents={this.getEvents}
      />
    );

    let eventHeader;
    if (events === null) eventHeader = <div />;
    else eventHeader = <h3>Upcoming Events</h3>;

    let eventItems;
    if (Array.isArray(events) && events.length < 1) {
      eventItems = (
        <div id="no-events">
        Bummer, {this.state.targetArtist} has not announced any upcoming shows
        </div>
      );
    } else if (Array.isArray(events)) {
      eventItems = events.map((event, i) => (
        <EventItem
          key={i}
          title={event.title}
          date={event.date}
          avail={event.avail}
          tix={event.tixUrl}
        />
      ));
    }

    return (
      <div id="main">
        <div id="top-bar">
          <h1>Spotifind</h1>
          <form id="search-form" onSubmit={this.newSearch}>
            <label>
              SEARCH FOR AN ARTIST:
              <input
                id="search-box"
                type="text"
                value={this.state.artistName}
                onChange={this.newArtist}
              />
            </label>
            <input id="submit-btn" type="submit" value="Search" />
          </form>
          {eventButton}
        </div>

        <div id="track-area">
          {tracks}
        </div>
        <br />
        {eventHeader}
        <div id="event-area">
          {eventItems}
        </div>
      </div>
    );
  }
}

export default App;
