const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pg = require('pg');
const db = require('./database');
const ArtistController = require('./controllers/ArtistController');
const APIController = require('./controllers/APIController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/getTracks', APIController.spotify);

app.get('/getEvents', APIController.bandsintown);

/* eslint-disable no-console */
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
