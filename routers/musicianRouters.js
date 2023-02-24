const express = require ("express")
const router = express.Router()
const Musician = require("../models/Musician")
const {check, validationResult} = require("express-validator");

router.get('/musicians' , async (req, res) => {
const allMusicians = await Musician.findAll(); // fixed
res.json(allMusicians);
});

router.get('/musicians/:id', async (req, res) => {
    const fetchedMusician = await Musician.findByPk(req.params.id); // fixed
    res.json(fetchedMusician);
});

router.post('/musicians/:id', [check('name').not().isEmpty().trim()], [check('instrument').not().isEmpty().trim()], async (req, res) => {
const {name, instrument} = req.body;
const errors = validationResult(req);
if(!errors.isEmpty()){
res.json({error: errors.array()});
} else {
const newMusician = await Musician.create({
name,
instrument
});
res.send(newMusician);
}
});

router.put('/musicians/:id', async (req, res) => {
try {
const { name, instrument } = req.body;
const updatedMusician = await Musician.update(
{ name, instrument },
{ where: { id: req.params.id } }
);
if (updatedMusician[0] === 1) {
const updatedMusician = await Musician.findByPk(req.params.id); // fixed
res.json(updatedMusician);
} else {
res.status(404).json({ error: 'Musician not found' });
}
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Unable to update musician' });
}
});

router.delete('/musicians/:id', async (req, res) => {
const musicianId = req.params.id;
try {
const musician = await Musician.findByPk(musicianId); // fixed
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

module.exports = router;