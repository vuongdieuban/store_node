const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");

module.exports = function(app) {
  // using JSON.parse() on incoming(serialized) JSON request.body and deserialize into native JS object req.body
  app.use(express.json());

  // allow cors
  app.use(cors());
  // Routing
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);

  // Error Handling middleware
  app.use(error);
};
