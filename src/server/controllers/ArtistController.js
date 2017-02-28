const Artists = require('./../models/ArtistModel');

const ArtistController = {
  update(req) {
    Artists.findOne({
      where: { name: req.artistName },
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
        artist.update({
          count: newCount,
          spotifyData: req.spotifyData,
        });
      }
    })
    .catch(err => console.log(err));
  },
  bitupdate(req) {
    Artists.findOne({
      where: { name: req.artistName },
    })
    .then((artist) => {
      artist.update({
        bandsintownData: req.bandsintownData,
      });
    })
    .catch(err => console.log(err));
  },
};

module.exports = ArtistController;
