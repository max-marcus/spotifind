const Artists = require('./../models/ArtistModel');

const ArtistController = {
  update(req) {
    const artistName = req.artistName || req.query.artist.toLowerCase();
    Artists.findOne({
      where: { name: artistName },
    })
    .then((artist) => {
      if (!artist) {
        Artists.create({
          name: req.artistName,
          spotifyData: req.spotifyData,
        })
        .then()
        .catch(err => console.log(err));
      } else {
        const artistCount = artist.getDataValue('count');
        const newCount = artistCount + 1;
        if (req.spotifyData) {
          artist.update({
            count: newCount,
            spotifyData: req.spotifyData,
          });
        } else {
          artist.update({
            count: newCount,
          });
        }
      }
    })
    .catch(err => console.log(err));
  },
  bitupdate(req) {
    const artistName = req.artistName || req.query.artist.toLowerCase();
    Artists.findOne({
      where: { name: artistName },
    })
    .then((artist) => {
      artist.update({
        bandsintownData: req.bandsintownData,
      });
    })
    .catch(err => console.log(err));
  },
  checkLast(req, res, next) {
    const artist = (req.query.artist).toLowerCase();
    Artists.findOne({
      where: { name: artist },
    })
    .then((found) => {
      req.foundData = {};
      if (!found) next();
      else {
        req.foundData.date = found.getDataValue('updatedAt');
        req.foundData.spotify = found.getDataValue('spotifyData');
        req.foundData.bit = found.getDataValue('bandsintownData');
        next();
      }
    });
  },
};

module.exports = ArtistController;
