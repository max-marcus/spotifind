import React from 'react';

const EventButton = (props) => {
  const { artist, getEvents } = props;

  return (
    <input
      type="submit"
      value="Like this artist? See their upcoming shows!"
      id="event-btn"
      onClick={() => { getEvents(artist); }}
    />
  );
};

EventButton.propTypes = {
  artist: React.PropTypes.string.isRequired,
  getEvents: React.PropTypes.func.isRequired,
};

export default EventButton;
