import React, { Component } from 'react';

const EventButton = (props) => {
  const { artist, getEvents } = props;

  return (
    <input type="submit" value="Like this artist? See their upcoming shows!" id="event-btn" onClick={() => {getEvents(artist)}} />
  )
}

export default EventButton;
