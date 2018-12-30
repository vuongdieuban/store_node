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

// Listen on Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
