const { logger } = require("../startup/logging");
const winston = require("winston");
const { format, transports } = winston;

module.exports = function(err, req, res, next) {
  logger.error({ message: err.stack });
  res.status(500).send("Something failed on the server.");
};
