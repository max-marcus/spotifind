const axios = require('axios');

const APIController = {
  spotify(req, res) {
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
  },
  bandsintown(req, res) {
    const artistName = req.query.artist;
    axios.get(`http://api.bandsintown.com/artists/${artistName}/events.json?api_version=2.0&app_id=spotifind`)
      .then((response) => {
        res.send(response.data);
      })
      .catch(err => console.log(err));
  },
};

module.exports = APIController;
