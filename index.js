require('express-async-errors'); // module for handling route errors, similar functionality to './middleware/async'

const winston = require('winston');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Loggin error of Node process (outside the context of Express)
process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
})


// Unhandle Promise Rejection
process.on('unhandledRejection', (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex; // handled by winston.ExceptionHandler
})

winston.ExceptionHandler(new winston.transports.File({ filename: 'uncaughtException.log' }));

// Logging error (of request processing pipelines of Express) into log file (check documentation for more details)
const files = new winston.transports.File({ filename: 'combined.log' });
winston.add(files);


/**set jwtPrivateKey in terminal
 * in PowerShell: $env:video_store_jwtPrivateKey="optionalPrivateKeyString" 
 * in GitBash: export video_store_jwtPrivateKey="optionalPrivateKeyString" */
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

// Connect to Mongodb 
mongoose.connect('mongodb://localhost/video_store', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB.'));

// using JSON.parse() on incoming(serialized) JSON request.body and deserialize into native JS object req.body
app.use(express.json());

// Routing 
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Error Handling middleware
app.use(error);

// Listen on Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
