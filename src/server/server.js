const express = require('express');
const path = require('path');
const axios = require('axios');
// const pg = require('pg');

const app = express();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://OneLove:spotifind@localhost:5432/spotifind');

const ArtistSearch = sequelize.define('artistSearch', {
  artist: {
    type: Sequelize.STRING,
    field: 'artist_name',
  },
}, {
  freezeTableName: true,
});

ArtistSearch.sync({ force: true }).then(() => {
  // console.log('database created');
});

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' })
    .status(200)
    .sendFile(path.join(__dirname, './../client/index.html'));
});

app.get('/styles.css', (req, res) => {
  res.set({ 'Content-Type': 'text/css; charset=UTF-8' })
    .status(200)
    .sendFile(path.join(__dirname, './../client/styles.css'));
});

app.get('/bundle.js', (req, res) => {
  res.set({ 'Content-Type': 'application/json; charset=UTF-8' })
    .status(200)
    .sendFile(path.join(__dirname, './../client/public/bundle.js'));
});

app.get('/getTracks', (req, res) => {
  const artistName = req.query.artist;
  axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`)
    .then((response) => {
      const id = response.data.artists.items[0].id;
      axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
        .then((tracks) => {
          res.send(tracks.data);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

app.get('/getEvents', (req, res) => {
  const artistName = req.query.artist;
  axios.get(`http://api.bandsintown.com/artists/${artistName}/events.json?api_version=2.0&app_id=spotifind`)
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => console.log(err));
});

/* eslint-disable no-console */
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
