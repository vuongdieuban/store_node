const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Model(to be replaced with Mongo)
var genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" },
];

/**--------------ListCreateView------------
 * endpoint: /api/genres/
 * GET request for querying all genres
 * POST request for creating a genres
 *-----------------------------------------*/

// GET request, query list of genres 
router.get('/', (req, res) => {
    res.send(genres);
})

// POST request, create a new genres
router.post('/', (req, res) => {
    // Validate the req.body
    const result = validateReq(req.body);
    console.log(result);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const new_genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(new_genre);
    res.status(200).send(`Successfully create a new genre: ${new_genre.name}`);
})


/**--------------DetailView------------
 * endpoint: /api/genres/:id
 * GET request for querying <id> genre
 * PUT request for updating <id> genre
 * DELETE for deleting <id> genre
 *-----------------------------------------*/

// GET request, query specific genre by id
router.get('/:id', (req, res) => {
    const genre = genres.find((element) => {
        return element.id === parseInt(req.params.id);
    });
    if (!genre) {
        return res.status(404).send("There is no genre with this specifid id")
    };
    res.status(200).send(genre);
})

// PUT request, update specific genre by id
router.put('/:id', (req, res) => {
    // verify if genre exist
    const genre = genres.find((element) => {
        return element.id === parseInt(req.params.id);
    });
    if (!genre) {
        return res.status(404).send("There is no genre with this specifid id")
    };

    // if exist => validate updated data
    const result = validateReq(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    // update if everything is correct
    // Did not update the genres model here, but need to update the specific one in MongoDb
    genre.name = req.body.name;
    res.send(genre);
})

// DELETE request, update specific genre by id
router.delete('/:id', (req, res) => {
    const genre = genres.find(element => {
        return element.id === parseInt(req.params.id);
    })
    if (!genre) {
        return res.status(404).send("There is no hero with this provided id")
    }

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the same genre (the one that deleted)
    res.send("Genre deleted");
});


/** ------------------Utils functions------------------ */
// Validating req.body
function validateReq(body) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(body, schema);
    return result;
}


module.exports = router;