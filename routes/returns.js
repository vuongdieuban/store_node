const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Joi = require("joi");
const { Rental } = require("../models/rentals");
const { Movie } = require("../models/movies");

router.post("/", auth, async (req, res) => {

  const result = validateReturns(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // "lookup" is a user defined static method
  let rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) 
    return res.status(404).send("Rental not found");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed");

  // "returns" is a user defined instance method, update dateReturned and calculate rentalFee
  rental.returns();
  await rental.save();

  // Increase the stock
  let movie = await Movie.findById(req.body.movieId);
  movie.numberInStock++;
  await movie.save();

  res.status(200).send(rental);
});

function validateReturns(req){
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;
