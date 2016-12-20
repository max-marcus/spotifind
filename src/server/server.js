const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.set({'Content-Type': 'text/html; charset=UTF-8'})
  .status(200)
  .sendFile(path.join(__dirname + './../client/index.html'));
})

app.get('/styles.css', (req, res) => {
  res.set({ 'Content-Type': 'text/css; charset=UTF-8' })
    .status(200)
    .sendFile(path.join(__dirname + './../client/styles.css'));
})

app.get('/bundle.js', (req, res) => {
  res.set({ 'Content-Type': 'application/json; charset=UTF-8'})
    .status(200)
    .sendFile(path.join(__dirname + './../client/public/bundle.js'))
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})