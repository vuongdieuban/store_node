const mongoose = require("mongoose");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genres");
const express = require("express");
const router = express.Router();

/**--------------ListCreateView------------
 * endpoint: /api/genres/
 * GET request for querying all genres
 * POST request for creating a genres
 *-----------------------------------------*/

// GET request, query list of genres
// asyncMiddlware handles try_catch block, returns async function back. This function is unneccessary if use express-async-errors module
router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    // throw new Error("testing error.js middleware (using winston to log)");
    const genres = await Genre.find().sort("name");
    res.send(genres);
  })
);

// POST request, create a new genres
// auth (authorization) is middleware function that protect this endpoint
router.post("/", auth, async (req, res) => {
  // Validate the req.body
  const result = validate(req.body);
  console.log(result);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  let new_genre = new Genre({
    name: req.body.name
  });
  new_genre = await new_genre.save();
  console.log(new_genre);
  res.status(200).send(`Successfully create a new genre: ${new_genre.name}`);
});

/**--------------DetailView------------
 * endpoint: /api/genres/:id
 * GET request for querying <id> genre
 * PUT request for updating <id> genre
 * DELETE for deleting <id> genre
 *-----------------------------------------*/

// GET request, query specific genre by id
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID");
  }

  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("There is no genre with this specifid id");
  }
  res.status(200).send(genre);
});

// PUT request, update specific genre by id
router.put("/:id", auth, async (req, res) => {
  // verify if genre exist
  let genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(400).send("Invalid Genre");
  }

  // if exist => validate updated data
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // update if everything is correct
  genre = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );
  res.send(genre);
});

// DELETE request, update specific genre by id
router.delete("/:id", [auth, admin], async (req, res) => {
  let genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(400).send("Invalid Genre");
  }
  // Return the same one that got deleted
  res.send(genre);
});

module.exports = router;
