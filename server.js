const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const port = 3000;

//TODO
app.use(express.json());

app.get('/musicians/:id', async (req, res) => {
  const fetchedMusician = await Musician.findByPk(req.params.id);
  res.json(fetchedMusician);
});

app.get('/musicians', async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

app.post('/musicians', async (req, res) => {
  try {
    const { name, instrument } = req.body;
    const newMusician = await Musician.create({
      name,
      instrument
    });
    res.json(newMusician);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'unable to create musician' });
  }
});

app.put('/musicians/:id', async (req, res) => {
  try {
    const { name, instrument } = req.body;
    const updatedMusician = await Musician.update(
      { name, instrument },
      { where: { id: req.params.id } }
    );
    if (updatedMusician[0] === 1) {
      const updatedMusician = await Musician.findByPk(req.params.id);
      res.json(updatedMusician);
    } else {
      res.status(404).json({ error: 'Musician not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update musician' });
  }
});

app.delete('/musicians/:id', async (req, res) => {
  const musicianId = req.params.id;
  try {
    const musician = await Musician.findByPk(musicianId);
    if (!musician) {
      return res.status(404).json({ error: 'Musician not found' });
    }
    await musician.destroy();
    res.json({ message: 'Musician deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});