const Sequelize = require('sequelize');
const sequelize = require('./../database');

const Artists = sequelize.define('artists', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  spotifyData: {
    type: Sequelize.TEXT,
    field: 'spotify_data',
  },
  bandsintownData: {
    type: Sequelize.TEXT,
    field: 'bandsintown_data',
  },
}, {
  freezeTableName: true,
});

Artists.sync();

module.exports = Artists;
