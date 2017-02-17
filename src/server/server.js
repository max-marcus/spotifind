const express = require('express');
const path = require('path');
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

/* eslint-disable no-console */
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
