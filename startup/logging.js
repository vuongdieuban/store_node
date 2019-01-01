const winston = require('winston');
const { format, transports } = winston;
const { combine, colorize, prettyPrint } = format;
require('express-async-errors'); // module for handling route errors, similar functionality to '../middleware/async'

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: '../error.log', level: 'error' }),
        new transports.File({ filename: '../combined.log' }),
        new transports.Console({
            format: format.simple()
        })
    ]
});

function exceptionHandler(logger) {
    // Call exceptions.handle with a transport to handle exceptions
    logger.exceptions.handle(
        new transports.File({ filename: '../uncaughtException.log' }),
        new transports.Console({
            format: format.simple()
        })
    );

    // Unhandle Promise Rejection   
    process.on('unhandledRejection', (ex) => {
        throw ex; // handled by logger.exceptions.handle()
    })
}

module.exports.logger = logger;
module.exports.exceptionHandler = exceptionHandler;