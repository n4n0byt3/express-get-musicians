const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.get('/musicians/:id', async (req, res) => {
    const fetchedMusician = await Musician.findByPk(req.params.id);
    res.json(fetchedMusician)
 })

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})