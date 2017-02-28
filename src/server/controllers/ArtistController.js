const Artists = require('./../models/ArtistModel');

const ArtistController = {
  update(req, res) {
    Artists.findOne({
      where: { name: req.body.name },
    })
    .then((artist) => {
      if (!artist) {
        Artists.create({
          name: req.body.name,
          spotifyData: req.body.spotify,
          bandsintownData: req.body.bit,
        });
      } else {
        const artistCount = artist.getDataValue('count');
        const newCount = artistCount + 1;
        artist.update({
          count: artistCount,
          spotifyData: req.body.spotify,
          bandsintownData: req.body.bit,
        });
      }
    });
  }
}

module.exports = ArtistController;
