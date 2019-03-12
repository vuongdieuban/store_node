const auth = require("../middleware/auth");
const { Rental, validate } = require("../models/rentals");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customers");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

// Use Fawn library for transactions in database
Fawn.init(mongoose);

/**--------------ListCreateView------------
 * endpoint: /api/rentals/
 * GET request for querying all rentals of a customer
 * POST request for renting a movie
 *-----------------------------------------*/
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("dateRented");
  res.status(200).send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res
      .status(404)
      .send("Sorry! There are no more of this movie avaliable");

  let new_rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      isGold: customer.isGold
    },
    movie: {
      _id: movie._id,
      name: movie.name,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    // for two phase commit of MongoDb, (atomic in RDBMS)
    new Fawn.Task()
      .save("rentals", new_rental) // rentals is the name of the collection (case sensitive--check mongodb )
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();
    res.status(200).send(new_rental);
  } catch (ex) {
    res
      .status(500)
      .send("Something failed in the server. Please try again later");
  }

  // new_rental = await new_rental.save();
  // movie.numberInStock--;
  // movie.save();
  // res.status(200).send(new_rental);
});

module.exports = router;
