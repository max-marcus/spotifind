import React, { Component } from 'react';

const EventItem = (props) => {
  const { title, date, avail, tix } = props;

  let tickets;
  if (avail === "available") {
    tickets = (
      <a href={tix}>Buy Tickets</a>
    )
  } else {
    tickets = (
      <div>Sorry, no tickets available for this event</div>
    )
  }

  return (
    <div className="event-container">
      <div id="event-text-area">
        <div id="event-title">{title}</div>
        <div id="event-date">{date}</div>
      </div>
      <div id="tix">{tickets}</div>
    </div>
  )
}

export default EventItem;