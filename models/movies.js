const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genres.js");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  }
});

// MongoDB model for Movie collection, embedded genreSchema from Genre Model
const Movie = mongoose.model("Movie", movieSchema);

/** ------------------Utils functions------------------ */
// Validating req.body
function validateReq(body) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(255)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(255)
      .required()
  };
  const result = Joi.validate(body, schema);
  return result;
}

module.exports.Movie = Movie;
module.exports.validate = validateReq;
module.exports.movieSchema = movieSchema;
