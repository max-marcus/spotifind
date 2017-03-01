const axios = require('axios');

const APIController = {
  spotify(req, res, next) {
    if (req.foundData.date) {
      const curDate = new Date().getTime();
      const foundDate = req.foundData.date.getTime();
      if (curDate - foundDate < 86400000) return res.send(req.foundData.spotify);
    }
    console.log('SPOTIFY API CALL');
    const artistName = req.query.artist;
    axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`)
      .then((response) => {
        req.artistName = (response.data.artists.items[0].name).toLowerCase();
        const id = response.data.artists.items[0].id;
        axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
          .then((tracks) => {
            req.spotifyData = JSON.stringify(tracks.data);
            res.send(tracks.data);
          })
          .catch(err => console.log(err))
          .then(() => next());
      })
      .catch(err => console.log(err));
  },
  bandsintown(req, res, next) {
    if (req.foundData.date) {
      const curDate = new Date().getTime();
      const foundDate = req.foundData.date.getTime();
      if (curDate - foundDate < 86400000 && req.foundData.bit) return res.send(req.foundData.bit);
    }
    console.log('BIT API CALL');
    const artistName = req.query.artist;
    axios.get(`http://api.bandsintown.com/artists/${artistName}/events.json?api_version=2.0&app_id=spotifind`)
      .then((response) => {
        req.artistName = (response.data[0].artists[0].name).toLowerCase();
        req.bandsintownData = JSON.stringify(response.data);
        res.send(response.data);
      })
      .catch(err => console.log(err))
      .then(() => next());
  },
};

module.exports = APIController;
