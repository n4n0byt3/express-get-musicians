const { Sequelize, sequelize } = require('../db');

// Defining the musician Model
let Musician = sequelize.define('musicians', {
name: Sequelize.STRING,
instrument: Sequelize.STRING
});

module.exports =Musician
