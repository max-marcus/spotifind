const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://OneLove:spotifind@localhost:5432/spotifind');

sequelize.authenticate().then(() => {
  console.log('Connected!');
}).catch((err) => {
  console.log('Error: ', err);
});

module.exports = sequelize;
