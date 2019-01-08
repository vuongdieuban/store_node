const winston = require("winston");
const { format, transports } = winston;
require("express-async-errors"); // module for handling route errors, similar functionality to '../middleware/async'

const logger = winston.createLogger({
  format: format.simple(),
  transports: [
    new transports.File({ filename: `${__dirname}/../logs/combined.log` }),
    new transports.Console()
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${__dirname}/../logs/uncaughtException.log`
    }),
    new transports.Console()
  ]
});

function exceptionHandler() {
  // Unhandle Promise Rejection
  process.on("unhandledRejection", ex => {
    throw ex; // handled by logger
  });
}

module.exports.logger = logger;
module.exports.exceptionHandler = exceptionHandler;
