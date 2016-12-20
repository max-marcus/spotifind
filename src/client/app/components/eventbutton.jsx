import React, { Component } from 'react';

const EventButton = (props) => {
  const { artist, getEvents } = props;

  return (
    <input type="submit" value="Get Events For This Artist" id="event-btn" onClick={() => {getEvents(artist)}} />
  )
}

export default EventButton;
