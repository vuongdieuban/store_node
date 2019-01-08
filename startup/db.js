const { logger } = require("./logging");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function() {
  // Connect to Mongodb
  mongoose
    .connect(
      config.get("db"),
      { useNewUrlParser: true }
    )
    .then(() =>
      logger.log({
        level: "info",
        message: `Connected to ${config.get("db")}...!`
      })
    );
};
