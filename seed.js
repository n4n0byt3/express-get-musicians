const {Musician} = require("./models/Musician")
const {sequelize} = require("./db");
const seedData = require("./seedData");

const syncSeed = async () => {
    await sequelize.sync({force: true});
    seedData.map(musician => Musician.create(musician));
}

syncSeed()

