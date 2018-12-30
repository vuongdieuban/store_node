const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');
const express = require('express');
const router = express.Router();


/**--------------ListCreateView------------
 * endpoint: /api/movies/
 * GET request for querying all movies
 * POST request for creating a movies
 *-----------------------------------------*/

// GET request, query list of movies 
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies);
})

// Post request, create a movie
router.post('/', auth, async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    try {
        const genre = await Genre.findById(req.body.genreId);

        let movie = new Movie({
            name: req.body.name,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
        movie = await movie.save();
        res.status(200).send(movie);
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(400).send(ex.message);
    }
});


/**--------------DetailView------------
 * endpoint: /api/movies/:id
 * GET request for querying <id> movie
 * PUT request for updating <id> movie
 * DELETE for deleting <id> movie
 *-----------------------------------------*/

// GET request, query specific movie by id
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("There is no movie with this provided id");
    res.status(200).send(movie);
});

// PUT request, update specific movie by id
router.put('/:id', auth, async (req, res) => {
    // Validate body 
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    // Update
    try {
        // Verify that genre exist 
        const genre = await Genre.findById(req.body.genreId);

        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

        res.status(200).send(movie);
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }
});

// Delete
router.delete('/:id', [auth, admin], async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(400).send("Invalid Movie");
    res.send(movie);
});

module.exports = router;

//----------------------------------------------------------------------------------------