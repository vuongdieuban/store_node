const { Rental, validate } = require('../models/rentals');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');
const express = require('express');
const router = express.Router();


/**--------------ListCreateView------------
 * endpoint: /api/rentals/
 * GET request for querying all rentals of a customer
 * POST request for renting a movie 
 *-----------------------------------------*/
router.get('/', async (req, res) => {
    const rentals = Rental.find().sort('dateRented')
    res.status(200).send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send("There is no customer with this ID")

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send("There is no movie with this ID")

    if (movie.numberInStock === 0) return res.status(400).send("Sorry! There are no more of this movie avaliable")

    let new_rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            name: movie.name,
            genre: movie.genre
        },
        dateReturned: returnDate(),
    });

    new_rental = await new_rental.save();
    movie.numberInStock--;
    movie.save();
    res.status(200).send(new_rental);
});

// Utils functions
function returnDate() {
    let d = new Date();
    d.setDate(d.getDate() + 20);
    return d;
}
module.exports = router;