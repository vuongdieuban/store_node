const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB model for Genre collection
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


/**--------------ListCreateView------------
 * endpoint: /api/genres/
 * GET request for querying all genres
 * POST request for creating a genres
 *-----------------------------------------*/

// GET request, query list of genres 
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres);
})

// POST request, create a new genres
router.post('/', async (req, res) => {
    // Validate the req.body
    const result = validateReq(req.body);
    console.log(result);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    let new_genre = new Genre({
        name: req.body.name
    })
    new_genre = await new_genre.save();
    console.log(new_genre);
    res.status(200).send(`Successfully create a new genre: ${new_genre.name}`);
})


/**--------------DetailView------------
 * endpoint: /api/genres/:id
 * GET request for querying <id> genre
 * PUT request for updating <id> genre
 * DELETE for deleting <id> genre
 *-----------------------------------------*/

// GET request, query specific genre by id
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) {
        return res.status(404).send("There is no genre with this specifid id")
    };
    res.status(200).send(genre);
})

// PUT request, update specific genre by id
router.put('/:id', async (req, res) => {
    // verify if genre exist
    let genre = await Genre.findById(req.params.id)
    if (!genre) {
        return res.status(404).send("There is no genre with this specifid id")
    };

    // if exist => validate updated data
    const result = validateReq(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    // update if everything is correct
    genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true });
    res.send(genre);
})

// DELETE request, update specific genre by id
router.delete('/:id', async (req, res) => {
    let genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) {
        return res.status(404).send("There is no hero with this provided id")
    }
    // Return the same one that got deleted
    res.send(genre);
});


/** ------------------Utils functions------------------ */
// Validating req.body
function validateReq(body) {
    const schema = {
        name: Joi.string().min(5).required()
    };
    const result = Joi.validate(body, schema);
    return result;
}


module.exports = router;