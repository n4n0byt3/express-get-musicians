const {Band} = require('./models/Band')
const {Musician} = require('./models/Musician')

Musician.belongsTo(Band)
Band.hasMany(Musician)

module.exports = {
    Band,
    Musician
};
