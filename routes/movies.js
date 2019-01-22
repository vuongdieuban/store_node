const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

/**Set up multer for file storage (movieImage) */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Can only accept jpeg and png"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

/**--------------ListCreateView------------
 * endpoint: /api/movies/
 * GET request for querying all movies
 * POST request for creating a movies
 *-----------------------------------------*/

// GET request, query list of movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

// Post request, create a movie
router.post("/", auth, upload.single("movieImage"), async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre not found");

  let movie = new Movie({
    name: req.body.name,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  // Check to see if there is image file
  if (req.file) {
    movie.movieImage = req.file.path;
  }

  await movie.save();
  res.status(200).send(movie);
});

/**--------------DetailView------------
 * endpoint: /api/movies/:id
 * GET request for querying <id> movie
 * PUT request for updating <id> movie
 * DELETE for deleting <id> movie
 *-----------------------------------------*/

// GET request, query specific movie by id
router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("There is no movie with this provided id");
  res.status(200).send(movie);
});

// PUT request, update specific movie by id
router.put(
  "/:id",
  validateObjectId,
  auth,
  upload.single("movieImage"),
  async (req, res) => {
    // Validate body
    const result = validate(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    // Verify that genre exist
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send("Genre not found");

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      },
      { new: true }
    );
    // Check to see if there is image file
    if (req.file) {
      movie.movieImage = req.file.path;
    }

    res.status(200).send(movie);
  }
);

// Delete
router.delete("/:id", validateObjectId, [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(400).send("Invalid Movie");
  res.send(movie);
});

module.exports = router;
